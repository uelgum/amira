import jwt from "jwt-promisify";
import { Locals as Payload } from "express";
import AmiraError from "@structs/amiraError";
import User, { getFirstName } from "@models/user";
import config from "@config";

// Schemas
import loginSchema from "@schemas/auth/login";
import registerSchema from "@schemas/auth/register";

// Services
import { generateId } from "@services/id";
import { sendVerificationEmail } from "@services/email";
import {
    hashPassword,
    comparePasswords, 
    generateUserKey,
    generatePasswordKey,
    generateRecoveryKey
} from "@services/crypto";

/**
    Generiert ein JWT.
*/
const generateToken = async (user: User, key: string) => {
    const payload: Payload = {
        id: user.id,
        name: getFirstName(user),
        key
    };

    if(user.admin) payload.admin = true;

    return jwt.sign(payload, config.jwtKey);
};

/**
    Meldet einen Nutzer an.
*/
const login = async (data: Record<string, any>) => {
    const { error } = loginSchema.validate(data, {
        presence: "required"
    });

    if(error) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const { email, password } = data;

    const user = await User.findOne({ email });

    if(!user) {
        throw new AmiraError(400, "AUTH_ERROR", "INVALID_LOGIN_DATA");
    }

    const isPasswordOk = await comparePasswords(password, user.password);

    if(!isPasswordOk) {
        throw new AmiraError(400, "AUTH_ERROR", "INVALID_LOGIN_DATA");
    }

    const passwordKey = generatePasswordKey(password, user.createdAt);
    const token = await generateToken(user, passwordKey);

    return {
        token: `Bearer ${token}`,
        emailUnverifed: user.emailUnverified
    };
};

/**
    Erstellt ein neues Benutzerkonto.
*/
const register = async (data: Record<string, any>) => {
    const { error } = registerSchema.validate(data, {
        presence: "required"
    });

    if(error) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const {
        firstName,
        lastName,
        email,
        password,
        passwordRetype
    } = data;

    const emailExists = await User.exists({ email });

    if(emailExists) {
        throw new AmiraError(400, "AUTH_ERROR", "EMAIL_ALREADY_EXISTS");
    }

    if(password !== passwordRetype) {
        throw new AmiraError(400, "AUTH_ERROR", "MISMATCHED_PASSWORDS");
    }

    const createdAt = Date.now();
    const passwordHash = await hashPassword(password);

    // Schlüssel generieren
    const passwordKey = generatePasswordKey(password, createdAt);
    const userKey = generateUserKey(passwordKey);
    const [ recoveryCode, recoveryKey ] = generateRecoveryKey(passwordKey);

    const user = new User({
        id: generateId(),
        firstName,
        lastName,
        email,
        emailUnverified: true,
        password: passwordHash,
        userKey,
        recoveryKey,
        createdAt
    });

    await user.save();

    sendVerificationEmail(user);

    return recoveryCode;
};

export {
    login,
    register,
    generateToken
};