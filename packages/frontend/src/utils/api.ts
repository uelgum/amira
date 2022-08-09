import { navigate } from "svelte-routing";
import { fetch, Body } from "@tauri-apps/api/http";

// Intern
import { TOKEN_KEY } from "@utils/constants";
import config from "../config";

// Types
import type { FetchOptions, HttpVerb } from "@tauri-apps/api/http";

// #region Types
/**
    Verfügbare HTTP-Methoden.
*/
type Method = Extract<HttpVerb, "GET" | "POST">;

/**
    Antwort der Amira API.
*/
type Response<T = Record<string, any>> = {
    status: "ok" | "err";
    data?: T;
    err?: {
        code: string;
    };
};
// #endregion

/**
    Base-URL der API.
*/
const BASE_URL = config.apiBaseUrl;

/**
    Schickt eine HTTP-Anfrage an die API.
*/
const sendRequest = async <T>(method: Method, endpoint: string, data?: Record<string, any>) => {
    const options: FetchOptions = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if(method === "POST" && !!data) {
        options.body = Body.json(data);
    }

    // Token zur Anfrage hinzufügen, falls vorhanden 
    const token = window.localStorage.getItem(TOKEN_KEY);

    if(!!token) {
        options.headers["Authorization"] = token;
    }

    const response = await fetch<Response<T>>(BASE_URL + endpoint, options);

    // Bei ungültigen oder fehlenden Tokens zum Login weiterleiten
    if(response.status === 401) {
        if(!!token) window.localStorage.removeItem(TOKEN_KEY);

        navigate("/login");
        throw new Error("INVALID_LOGIN");
    }

    return response.data;
};

/**
    Schickt eine `GET`-Anfrage an die API.
*/
const get = async <T = any>(endpoint: string) => {
    return sendRequest<T>("GET", endpoint);
};

/**
    Schickt eine `POST`-Anfrage an die API.
*/
const post = async <T = any>(endpoint: string, data: Record<string, any>) => {
    return sendRequest<T>("POST", endpoint, data);
};

export {
    get,
    post
};