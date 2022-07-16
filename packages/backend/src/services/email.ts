import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { Op } from "sequelize";

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

/**
    Zeit, bevor eine E-Mail erneut verschickt werden kann.
    Stellt 5 Minuten dar.
*/
const EMAIL_DELAY = 1000 * 60 * 5;

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
        createdAt: Date.now()
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

/**
    Verschickt eine E-Mail zum Zurücksetzen des Passworts.
*/
const sendPasswordResetEmail = async (data: Record<string, any>) => {
    const { userEmail, os, browser } = data;

    if(!userEmail) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({
        where: {
            email: userEmail
        }
    });

    if(!user) {
        throw new AmiraError(400, "USER_NOT_FOUND");
    }

    // Überprüfen, ob eine E-Mail bereits geschickt wurde
    const reset = await Email.findOne({
        where: {
            type: EmailType.PASSWORD_RESET,
            userId: user.id
        }
    });

    if(reset) {
        if(Date.now() - reset.createdAt < EMAIL_DELAY) {
            throw new AmiraError(400, "EMAIL_SEND_DELAY");
        }

        // E-Mail löschen, falls vorhanden
        await reset.destroy();
    }

    const code = generateActionId(user.id, user.createdAt);

    const email = await Email.create({
        id: generateId(),
        type: EmailType.PASSWORD_RESET,
        userId: user.id,
        actionId: code,
        createdAt: Date.now()
    });

    await email.save();

    // TODO OS und Plattform überprüfen

    const template = fs.readFileSync(path.join(EMAILS_PATH, "passwordReset.html"), "utf-8")
        .replace("%NAME%", user.firstName)
        .replace("%OS%", os)
        .replace("%BROWSER%", browser)
        .replace(/%LINK%/g, code);

    try {
        await transport.sendMail({
            from: "Amira <bot@gumenyuk.de>",
            to: userEmail,
            subject: "Passwort-Reset",
            html: template
        });
    } catch(error) {
        await email.destroy();
    }
};

export {
    sendVerificationEmail,
    sendPasswordResetEmail
};