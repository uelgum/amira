import jwt from "jwt-promisify";

// Intern
import AmiraError from "@structs/error";
import User from "@models/user";
import { validateLoginData, validateRegisterData } from "@services/validator";
import { generateId } from "@services/id";
import { sendVerificationEmail } from "@services/email";
import {
    comparePassword,
    derivePasswordKey,
    generateRecoveryKey,
    generateUserKey,
    hashPassword
} from "@services/crypto";

// Config
import config from "@config";

// Types
import type { Request } from "express";

/**
    Generiert ein JWT.
*/
const generateJwt = async (payload: Record<string, any>) => {
    const token = await jwt.sign(payload, config.jwtKey);
    return `Bearer ${token}`;
};

/**
    Meldet einen Nutzer an.
*/
const login = async (req: Request) => {
    const isValid = validateLoginData(req.body);

    if(!isValid) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const { username, password } = req.body;

    const user = await User.findOne({
        where: {
            username: username
        }
    });

    if(!user) {
        throw new AmiraError(400, "INVALID_LOGIN");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if(!isPasswordValid) {
        throw new AmiraError(400, "INVALID_LOGIN");
    }

    const passwordKey = derivePasswordKey(password, user.createdAt);

    const token = await generateJwt({
        id: user.id,
        firstName: user.firstName,
        username,
        key: passwordKey,
        // TODO Admin-Status hinzufügen
    });

    return {
        token,
        ...(!user.emailVerified && { emailUnverified: true })
    };
};

/**
    Erstellt ein neues Konto.
*/
const register = async (req: Request) => {
    const isValid = validateRegisterData(req.body);

    if(!isValid) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const {
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirm
    } = req.body;

    const usernameCount = await User.count({
        where: {
            username
        }
    });

    if(usernameCount > 0) {
        throw new AmiraError(400, "USERNAME_TAKEN");
    }

    const emailCount = await User.count({
        where: {
            email
        }
    });

    if(emailCount > 0) {
        throw new AmiraError(400, "EMAIL_TAKEN");
    }

    if(password !== passwordConfirm) {
        throw new AmiraError(400, "MISMATCHED_PASSWORDS");
    }

    const createdAt = Date.now();

    // Passwort-Hash (bcrypt), wird in der Datenbank gespeichert
    const passwordHash = await hashPassword(password);

    // Passwort-Key (SHA-256), um damit den zufällig generierten User-Key zu verschlüsseln
    const passwordKey = derivePasswordKey(password, createdAt);
    
    // User-Key wird zum Verschlüsseln persönlicher Daten genutzt, und in der
    // Datenbank gespeichert
    const userKey = generateUserKey(passwordKey);

    // Password-Key mit zufällig generiertem Recovery-Code verschlüsselt, um
    // verlorene Passwörter wiederherzustellen
    const [ recoveryCode, recoveryKey ] = generateRecoveryKey(passwordKey);

    const user = await User.create({
        id: generateId(),
        firstName,
        lastName,
        username,
        email,
        emailVerified: false,
        password: passwordHash,
        userKey,
        recoveryKey,
        createdAt
    });

    await user.save();

    sendVerificationEmail({
        userId: user.id,
        firstName: user.firstName,
        email: user.email,
        createdAt: user.createdAt
    });

    return recoveryCode;
};

export {
    login,
    register,
    generateJwt
};