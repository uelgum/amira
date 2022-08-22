import * as openpgp from "openpgp";
import { join } from "@tauri-apps/api/path";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";

// Intern
import privateKeyStore from "@stores/privateKey";
import { getAppDir } from "@internal/paths";

/**
    Generiert ein OpenPGP Schlüsselpaar. Speichert den Private Key im
    App-Ordner und gibt den Public Key als `string` zurück.
*/
const generateKeyPair = async (fullName: string, email: string) => {
    const { privateKey, publicKey } = await openpgp.generateKey({
        userIDs: [
            { name: fullName, email }
        ]
    });

    const appDir = await getAppDir();
    const privateKeyPath = await join(appDir, "private.pem");

    await writeTextFile(privateKeyPath, privateKey);

    return publicKey;
};

/**
    Lädt den Private Key aus dem App-Ordner.
*/
const loadPrivateKey = async () => {
    const appDir = await getAppDir();
    const privateKeyPath = await join(appDir, "private.pem");

    const privateKeyFile = await readTextFile(privateKeyPath);

    const privateKey = await openpgp.readPrivateKey({
        armoredKey: privateKeyFile
    });

    privateKeyStore.set(privateKey);
};

export {
    generateKeyPair,
    loadPrivateKey
};