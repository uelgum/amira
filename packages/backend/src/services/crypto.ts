import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { AES, SHA256, MD5, enc } from "crypto-js";
import randomString, { GenerateOptions } from "randomstring";

/**
    Hashed das Passwort des Nutzers.
*/
const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

/**
    Überprüft das angegebene Passwort mit dem Hash.
*/
const comparePasswords = async (password: string, hashed: string) => {
    return bcrypt.compare(password, hashed);
};

/**
    Verschlüsselt einen String mit AES256.
*/
const encrypt = (data, key) => {
    return AES.encrypt(data, key).toString();
};

/**
    Entschlüsselt einen String mit AES256.
*/
const decrypt = (encrypted, key) => {
    return AES.decrypt(encrypted, key).toString(enc.Utf8);
};

/**
    Generiert einen zufälligen User-Key und verschlüsselt diesen mit
    dem Passwort-Key.
*/
const generateUserKey = (passwordKey: string) => {
    const seed = randomBytes(16).toString();
    const userKey = SHA256(seed).toString();

    return encrypt(userKey, passwordKey);
};

/**
    Generiert einen Password-Key zusammen mit dem unverarbeiteten
    Passwort des Nutzers und dem Erstellungsdatum des Kontos.
*/
const generatePasswordKey = (password: string, createdAt: number) => {
    return SHA256(password + createdAt).toString();
};

/**
    Generiert einen Wiederherstellungscode und verschlüsselt damit den
    angegeben Password-Key.
*/
const generateRecoveryKey = (passwordKey: string) => {
    const recoveryCodeOptions: GenerateOptions = {
        charset: "alphanumeric",
        capitalization: "uppercase",
        length: 16
    };
    
    const recoveryCode = randomString.generate(recoveryCodeOptions)
        .match(/.{4}/g)
        .join("-");

    const recoveryKey = encrypt(passwordKey, recoveryCode);

    return [
        recoveryCode,
        recoveryKey
    ];
};

/**
    Generiert einen Verifizierungs-Code für E-Mails.
*/
const generateVerifictionCode = (id: string, createdAt: number) => {
    const hash = MD5(id + createdAt).toString();
    return Buffer.from(hash).toString("base64url");
};

export {
    hashPassword,
    comparePasswords,
    encrypt,
    decrypt,
    generateUserKey,
    generatePasswordKey,
    generateRecoveryKey,
    generateVerifictionCode
};