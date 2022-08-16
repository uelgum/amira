import { fetch, Body } from "@tauri-apps/api/http";

// Intern
import { TOKEN_KEY } from "@internal/constants";
import config from "@internal/config";

// Types
import type { FetchOptions } from "@tauri-apps/api/http";

// #region Types
type Method = "GET" | "POST";

type Response<T = Record<string, any>> = {
    status: "ok" | "err";
    data?: T;
    err?: {
        code: string;
    };
};
// #endregion

/**
    Schickt eine HTTP-Anfrage an die Amira API.
*/
const sendRequest = async <T>(method: Method, url: string, data?: Record<string, any>) => {
    const options: FetchOptions = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if(method === "POST") {
        options.body = Body.json(data || {});
    }

    const token = window.localStorage.getItem(TOKEN_KEY);

    if(token) {
        options.headers["Authorization"] = token;
    }

    const response = await fetch<Response<T>>(url, options);

    return response.data;
};

/**
    Schickt eine `GET`-Anfrage an die Amira API.
*/
const get = async <T>(endpoint: string) => {
    return sendRequest<T>("GET", config.apiBaseUrl + endpoint);
};

/**
    Schickt eine `POST`-Anfrage an die Amira API.
*/
const post = async <T>(endpoint: string, data: Record<string, any>) => {
    return sendRequest<T>("POST", config.apiBaseUrl + endpoint, data);
};

export default {
    get,
    post
};