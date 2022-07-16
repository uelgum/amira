import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// Intern
import AmiraError from "@structs/error";
import Email, { EmailType } from "@models/email";
import User from "@models/user";
import { generateId } from "@services/id";
import { generateActionId } from "@services/crypto";

// Config
import config from "@config";

// #region Types
/**
    Daten für die Verifizierungs-E-Mail.
*/
type VerificationData = {
    /**
        ID des Nutzers.
    */
    userId: string;

    /**
        Vorname des Nutzers.
    */
    firstName: string;

    /**
        E-Mail des Nutzers.
    */
    email: string;

    /**
        Erstelldatum des Kontos.
    */
    createdAt: number;
};
// #endregion

/**
    Pfad zu E-Mail-Templates.
*/
const EMAILS_PATH = path.join(__dirname, "../../assets/email");

const email = config.email;

/**
    Transport für E-Mails.
*/
const transport = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    auth: {
        user: email.username,
        pass: email.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
    Verschickt eine Bestätigungs-E-Mail.
*/
const sendVerificationEmail = async (data: VerificationData) => {
    const { userId, firstName, email: userEmail, createdAt } = data;

    const code = generateActionId(userId, createdAt);

    const email = await Email.create({
        id: generateId(),
        type: EmailType.VERIFICATION,
        userId,
        actionId: code,
        createdAt
    });

    await email.save();

    const template = fs.readFileSync(path.join(EMAILS_PATH, "verification.html"), "utf-8")
        .replace("%NAME%", firstName)
        .replace(/%LINK%/g, code);

    try {
        await transport.sendMail({
            from: "Amira <bot@gumenyuk.de>",
            to: userEmail,
            subject: "Bestätige Deine E-Mail",
            html: template
        });
    } catch(error) {
        await email.destroy();
    }
};

export {
    sendVerificationEmail
};