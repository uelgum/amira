import email from "@controller/email";
import getFirstName from "@utils/getFirstName";
import type User from "@models/user";

// Services
import { generateVerifictionCode } from "@services/crypto";

/**
    Schickt einen Verifizierungs-Link an eine kürzlich registrierte E-Mail.
*/
const sendVerificationEmail = async (user: User) => {
    const name = getFirstName(user.firstName);
    const code = generateVerifictionCode(user.id, user.createdAt);

    // FIXME WIP
    const text = `Willkommen bei Amira, ${name}!\n` +
        `Bestätige deine E-Mail, indem du den folgenden Link anklickst: ` +
        code;

    email.sendMail({
        to: user.email,
        from: "Bot <bot@gumenyuk.de>",
        subject: "Bestätige deine E-Mail",
        text
    });
};

export {
    sendVerificationEmail
};