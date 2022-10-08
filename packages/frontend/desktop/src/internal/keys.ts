import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import * as openpgp from "openpgp";

// Intern
import { getAppDir } from "@internal/app";

/**
    Generiert ein OpenPGP-Schlüsselpaar.
*/
const generatePrivateKey = async (fullName: string, email: string) => {
    const { privateKey, publicKey } = await openpgp.generateKey({
        userIDs: [
            {
                comment: "Amira",
                name: fullName,
                email
            }
        ],
        format: "armored"
    });

    return { privateKey, publicKey };
};

/**
    Speichert den Private Key in den App-Dateien.
*/
const writePrivateKey = async (privateKey: string) => {
    const appDir = await getAppDir();
    const filePath = await join(appDir, "private.pem");

    await writeTextFile(filePath, privateKey);
};

/**
    Lädt den Private Key aus den App-Dateien.
*/
const readPrivateKey = async () => {
    const appDir = await getAppDir();
    const filePath = await join(appDir, "private.pem");

    const content = await readTextFile(filePath);

    const privateKey = await openpgp.readPrivateKey({
        armoredKey: content
    });

    return privateKey;
};

export {
    generatePrivateKey,
    writePrivateKey,
    readPrivateKey
};