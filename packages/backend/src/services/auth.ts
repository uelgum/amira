import jwt, { Payload } from "jwt-promisify";
import User from "@models/user";
import AmiraError from "@structs/amiraError";
import getFirstName from "@utils/getFirstName";
import config from "@config";

// Services
import { generateId } from "@services/id";
import { validateLoginData, validateRegisterData } from "@services/validation";
import { sendVerificationEmail } from "@services/email";
import {
    hashPassword,
    comparePasswords,
    generateUserKey,
    generatePasswordKey,
    generateRecoveryKey
} from "@services/crypto";

/**
    Signiert einen Payload mit dem JWT-Key und generiert das Token.
*/
const generateJwt = async (payload: Payload) => {
    return jwt.sign(payload, config.jwtKey);
};

/**
    Meldet einen Nutzer an.
*/
const login = async (data: Record<string, any>) => {
    const { error, subcode } = validateLoginData(data);

    if(error) {
        throw new AmiraError(400, "LOGIN_ERROR", subcode);
    }

    const { email, password } = data;

    const user = await User.findOne({ email });

    if(!user) {
        throw new AmiraError(400, "LOGIN_ERROR", "INVALID_EMAIL");
    }

    const isPasswordOk = await comparePasswords(password, user.password);

    if(!isPasswordOk) {
        throw new AmiraError(400, "LOGIN_ERROR", "INVALID_PASSWORD");
    }

    const passwordKey = generatePasswordKey(password, user.createdAt);

    const payload = {
        name: getFirstName(user.firstName),
        key: passwordKey,
        ...(user.admin && { admin: true }),
    };

    const token = await generateJwt(payload);

    return `Bearer ${token}`;
};

/**
    Registriert einen Nutzer.
*/
const register = async (data: Record<string, any>) => {
    const { error, subcode } = validateRegisterData(data);

    if(error) {
        throw new AmiraError(400, "REGISTRATION_ERROR", subcode);
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
        throw new AmiraError(400, "REGISTRATION_ERROR", "EMAIL_ALREADY_EXISTS");
    }

    if(password !== passwordRetype) {
        throw new AmiraError(400, "REGISTRATION_ERROR", "MISMATCHED_PASSWORDS");
    }

    const createdAt = Date.now();
    const id = generateId();

    const passwordHash = await hashPassword(password);

    const passwordKey = generatePasswordKey(password, createdAt);
    const userKey = generateUserKey(passwordKey);

    const [ recoveryCode, recoveryKey ] = generateRecoveryKey(passwordKey);

    const user = new User({
        id,
        firstName,
        lastName,
        email,
        emailUnverified: true,
        password: passwordHash,
        key: userKey,
        recoveryKey,
        contacts: [],
        createdAt
    });

    await user.save();
    sendVerificationEmail(user);

    return recoveryCode;
};

export {
    generateJwt,
    login,
    register
};