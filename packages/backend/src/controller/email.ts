import nodemailer from "nodemailer";
import config from "@config";

const { host, username, password } = config.email;

/**
    E-Mail-Transport für Amira.
*/
const email = nodemailer.createTransport({
    host,
    port: 587,
    auth: {
        user: username,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default email;