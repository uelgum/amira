import * as openpgp from "openpgp";
import { writable } from "svelte/store";
import { join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";

// Intern
import getAppPath from "@utils/appPath";

/**
    Private-Key des Nutzers.
*/
const privateKey = writable(null);

/**
    Lädt den Private Key aus dem App-Ordner. Nur in der
    Desktop-App verfügbar.
*/
const readPrivateKey = async (passphrase: string) => {
    const appPath = await getAppPath();

    const keyPath = await join(appPath, "seckey.pem");
    const keyData = await readTextFile(keyPath);

    const armoredKey = await openpgp.readPrivateKey({
        armoredKey: keyData
    });

    const key = await openpgp.decryptKey({
        privateKey: armoredKey,
        passphrase
    });

    privateKey.set(key);
};

export {
    readPrivateKey
};

export default privateKey;