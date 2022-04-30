import { createTransport } from "nodemailer";
import config from "@config";

const { host, username, password } = config.email;

/**
    E-Mail-Client für Amira.
*/
const email = createTransport({
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