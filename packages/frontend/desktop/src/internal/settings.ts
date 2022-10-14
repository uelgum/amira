import { get } from "svelte/store";
import { join } from "@tauri-apps/api/path";
import { exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";

// Intern
import { getAppDir } from "@internal/app";

// #region Types
type Data = {
    
};
// #endregion

/**
    Standard-Einstellungen.
*/
const DEFAULT_SETTINGS = {
    
};

/**
    Manager für Einstellungen.
*/
class Settings {
    // #region Attribute
    /**
        Ob der Manager initialisiert ist.
    */
    private _isInit: boolean;

    /**
        Pfad zur Datei.
    */
    private _path: string;

    /**
        Daten der Einstellungen.
    */
    private _data: Data;
    // #endregion

    /**
        Konstruktor.
    */
    constructor() {
        this._data = DEFAULT_SETTINGS;
    }

    /**
        Ob der Manager initialisiert ist.
    */
    public get isInit() {
        return this._isInit;
    }

    /**
        Pfad zur Datei.
    */
    public get path() {
        return this._path;
    }

    /**
        Daten der Einstellungen.
    */
    public get data() {
        return this._data;
    }

    /**
        Entfernt unzulässige Keys aus den Einstellungen.
    */
    private cleanSettings() {
        const acceptedValues = Object.keys(DEFAULT_SETTINGS);

        for(const key in this._data) {
            if(!acceptedValues.includes(key)) {
                delete this._data[key];
            }
        }
    }

    /**
        Initialisiert die Einstellungen.
    */
    public async init() {
        if(this._isInit) return;
        this._isInit = true;

        const appDir = await getAppDir();
        this._path = await join(appDir, "settings.json");

        try {
            await exists(this._path);
        } catch(error) {
            this.save();
        }

        const data = await readTextFile(this._path);

        try {
            this._data = JSON.parse(data);
        } catch(error) {
            // TODO Etwas machen
            return;
        }

        this.cleanSettings();

        // TODO Werte aus Data in Stores speichern o.ä.
    }

    /**
        Speichert die aktuellen Einstellungen in der Datei ab.
    */
    public async save() {
        // TODO Werte aus Stores mit "get" abrufen und in this._data spreaden
        await writeTextFile(this.path, JSON.stringify(this._data));
    }
}

export default new Settings();