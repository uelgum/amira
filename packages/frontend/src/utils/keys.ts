import * as openpgp from "openpgp";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";

// Intern
import getAppPath from "@utils/appPath";
import privateKeyStore from "@stores/privateKey";

// #region Types
type UserData = {
    /**
        Voller Name des Nutzers.
    */
    fullName: string;

    /**
        Passwort des Nutzers.
    */
    password: string;
};
// #endregion

/**
    Generiert ein OpenPGP-Schlüsselpaar.
*/
const generateKeyPair = async (userData: UserData) => {
    const appPath = await getAppPath();
    const privateKeyPath = await join(appPath, "seckey.pem");

    const { privateKey, publicKey } = await openpgp.generateKey({
        userIDs: [
            { name: userData.fullName }
        ],
        passphrase: userData.password
    });

    await writeTextFile(privateKeyPath, privateKey);

    return publicKey;
};

/**
    Lädt den Private Key aus dem App-Ordner.
*/
const loadPrivateKey = async (password: string) => {
    const appPath = await getAppPath();
    const privateKeyPath = await join(appPath, "seckey.pem");

    const privateKeyData = await readTextFile(privateKeyPath);

    const privateKeyArmored = await openpgp.readPrivateKey({
        armoredKey: privateKeyData
    });

    const privateKey = await openpgp.decryptKey({
        privateKey: privateKeyArmored,
        passphrase: password
    });

    privateKeyStore.set(privateKey);
};

export {
    generateKeyPair,
    loadPrivateKey
};