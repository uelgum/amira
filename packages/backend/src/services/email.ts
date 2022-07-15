import nodemailer from "nodemailer";

// Intern
import Verification from "@models/verification";
import { generateVerificationCode } from "@services/crypto";

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
    id: string;

    /**
        Vorname des Nutzers.
    */
    name: string;

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
    const { id, name, email, createdAt } = data;

    const code = generateVerificationCode(id, createdAt);

    const verification = await Verification.create({
        userId: id,
        verificationId: code,
        createdAt: Date.now()
    });

    await verification.save();

    // TODO Text hinzufügen

    try {
        await transport.sendMail({
            from: "Amira <bot@gumenyuk.de>",
            to: email,
            subject: "Bestätige Deine E-Mail"
        });
    } catch(error) {
        // noop
    }
};

export {
    sendVerificationEmail
};