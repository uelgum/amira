import bcrypt from "bcrypt";
import randomstring from "randomstring";
import crypto, { AES, PBKDF2 } from "crypto-js";

/**
    Verschlüsselt einen String mit dem AES-Algorithmus.
*/
const encrypt = (data: string, key: string) => {
    return AES.encrypt(data, key).toString();
};

/**
    Entschlüsselt einen String mit dem AES-Algorithmus.
*/
const decrypt = (data: string, key: string) => {
    return AES.decrypt(data, key).toString(crypto.enc.Utf8);
};

/**
    Generiert einen Passwort-Hash mit Bcrypt.
*/
const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};


/**
    Vergleicht einen mit Bcrypt erstellten Passwort-Hash.
*/
const comparePassword = (password: string, encrypted: string) => {
    return bcrypt.compare(password, encrypted);
};

/**
    Leitet das Passwort mit dem PBKDF2-Algorithmus her.
*/
const derivePasswordKey = (password: string) => {
    const salt = crypto.lib.WordArray.random(128 / 8);
    const passwordKey = PBKDF2(password, salt).toString();

    return passwordKey;
};

/**
    Generiert einen User-Key zum Verschlüsseln persönlicher Daten.
*/
const generateUserKey = (passwordKey: string) => {
    const randomKey = randomstring.generate({ length: 18 });
    const userKey = encrypt(randomKey, passwordKey);

    return userKey;
};

/**
    Generiert einen Wiederherstellungs-Schlüssel.
*/
const generateRecoveryKey = (passwordKey: string) => {
    const code = randomstring
        .generate({
            length: 16,
            charset: "alphanumeric",
            capitalization: "uppercase"
        })
        .match(/.{4}/g)!
        .join("-");

    const key = encrypt(passwordKey, code);

    return [ code, key ];
};

export {
    encrypt,
    decrypt,
    hashPassword,
    comparePassword,
    derivePasswordKey,
    generateUserKey,
    generateRecoveryKey
};