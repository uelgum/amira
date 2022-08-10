/**
    Schlüssel im `LocalStorage` für JWTs.
*/
export const TOKEN_KEY = "TOKEN";

/**
    Regex für E-Mail-Adressen.
*/
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
    Regex für Passwörter.
*/
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;