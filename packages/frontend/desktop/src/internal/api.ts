import { fetch, Body } from "@tauri-apps/api/http";

// Intern
import config from "@internal/config";

// Types
import type { FetchOptions } from "@tauri-apps/api/http";

// #region Types
type Method = "GET" | "POST";

type Data = Record<string, string | number | boolean>;

type Response<T> = {
    status: "ok" | "err";
    data?: T;
    err?: {
        code: string;
    };
};
// #endregion

/**
    Amira API.
*/
class API {
    /**
        Schickt eine Anfrage an die Amira API.
    */
    private async request<T>(method: Method, endpoint: string, data?: Data) {
        const url = config.apiBaseUrl + endpoint;
        
        const options: FetchOptions = {
            method
        };

        if(method === "POST" && data) {
            options.body = Body.json(data);
        }

        const response = await fetch<Response<T>>(url, options);

        return response.data;
    }

    /**
        Schickt eine `GET`-Anfrage an die Amira API.
    */
    public async get<T = Data>(endpoint: string) {
        return this.request<T>("GET", endpoint);
    }

    /**
        Schickt eine `POST`-Anfrage an die Amira API.
    */
    public async post<T = Data>(endpoint: string, data?: Data) {
        return this.request<T>("POST", endpoint, data);
    }
}

export default new API();