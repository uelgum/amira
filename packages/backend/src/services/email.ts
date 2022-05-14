import email from "@controller/email";
import User, { getFirstName } from "@models/user";
import EmailVerification from "@models/emailVerification";

// Services
import { generateRandomHash } from "@services/crypto";

/**
    Sendet eine Verifizierungs-E-Mail an den Nutzer.
*/
const sendVerificationEmail = async (user: User) => {
    const name = getFirstName(user);
    const hash = generateRandomHash();

    const text = `Willkommen bei Amira, ${name}! ` +
        "Bestätige deine E-Mail, indem du auf den folgenden Link klickst: " +
        hash;

    try {
        await email.sendMail({
            to: user.email,
            from: "Amira <bot@gumenyuk.de>",
            subject: "Bestätige deine E-Mail",
            text
        });
    } catch(error) {
        return;
    }

    const verification = new EmailVerification({
        userId: user.id,
        hash,
        createdAt: Date.now()
    });

    await verification.save();
};

export {
    sendVerificationEmail
};