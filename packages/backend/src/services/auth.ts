import jwt from "jwt-promisify";

// Intern
import AmiraError from "@structs/error";
import User from "@models/user";
import { validateLoginData, validateRegisterData } from "@services/validator";
import { generateId } from "@services/id";
import {
    comparePassword,
    derivePasswordKey,
    generateRecoveryKey,
    generateUserKey,
    hashPassword
} from "@services/crypto";

// Config
import config from "@config";

// #region Types
/**
    Erhaltene Login-Daten.
*/
type LoginData = {
    /**
        Nutzername.
    */
    username: string;

    /**
        Passwort.
    */
    password: string;
};

/**
    Erhaltene Registrierungs-Daten.
*/
type RegisterData = {
    /**
        Vorname.
    */
    firstName: string;

    /**
        Nachname.
    */
    lastName: string;

    /**
        Nutzername.
    */
    username: string;

    /**
        E-Mail.
    */
    email: string;
    
    /**
        Passwort.
    */
    password: string;

    /**
        Bestätigung des Passworts.
    */
    passwordConfirm: string;
};
// #endregion

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
const login = async (data: LoginData) => {
    const isValid = validateLoginData(data);

    if(!isValid) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const { username, password } = data;

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

    return generateJwt({
        id: user.id,
        username,
        key: passwordKey,
        // TODO Admin-Status hinzufügen
    });
};

/**
    Erstellt ein neues Konto.
*/
const register = async (data: RegisterData) => {
    const isValid = validateRegisterData(data);

    if(!isValid) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const { firstName, lastName, username, email, password, passwordConfirm } = data;

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

    // TODO E-Mail senden

    return recoveryCode;
};

export {
    login,
    register,
    generateJwt
};