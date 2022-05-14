import bcrypt from "bcrypt";
import randomstring from "randomstring";
import { randomBytes } from "crypto";
import { AES, SHA256 } from "crypto-js";

// Encoding
import Utf8 from "crypto-js/enc-utf8";
import Base64Url from "crypto-js/enc-base64url";

/**
    Verschlüsselt Daten mit AES256.
*/
const encrypt = (data: string, key: string) => {
    return AES.encrypt(data, key).toString();
};

/**
    Entschlüsselt Daten mit AES256.
*/
const decrypt = (encrypted: string, key: string) => {
    return AES.decrypt(encrypted, key).toString(Utf8);
};

/**
    Hashed ein Passwort mit `bcrypt.`
*/
const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

/**
    Vergleicht ein Passwort mit dem verschlüsselten Passwort mittels `bcrypt`.
*/
const comparePasswords = async (password: string, encrypted: string) => {
    return bcrypt.compare(password, encrypted);
};

/**
    Generiert einen zufälligen Hash.
*/
const generateRandomHash = () => {
    const seed = randomBytes(16).toString();
    return SHA256(seed).toString(Base64Url);
};

/**
    Generiert einen zufälligen User-Schlüssel.
*/
const generateUserKey = (passwordKey: string) => {
    const seed = randomBytes(16).toString();
    const userKey = SHA256(seed).toString();

    return encrypt(userKey, passwordKey);
};

/**
    Generiert den Passwort-Schlüssel eines Nutzers.
*/
const generatePasswordKey = (password: string, createdAt: number) => {
    return SHA256(password + createdAt).toString();
};

/**
    Generiert einen Wiederherstellungscode und -Schlüssel für verlorene Passwörter.
*/
const generateRecoveryKey = (passwordKey: string) => {
    const code = randomstring.generate({
        charset: "alphanumeric",
        capitalization: "uppercase",
        length: 16
    }).match(/.{4}/g).join("-");

    const key = encrypt(passwordKey, code);

    return [ code, key ];
};

export {
    encrypt,
    decrypt,
    hashPassword,
    comparePasswords,
    generateRandomHash,
    generatePasswordKey,
    generateUserKey,
    generateRecoveryKey
};