import User from "@models/user";
import EmailVerification from "@models/emailVerification";
import AmiraError from "@structs/amiraError";

/**
    Verifiziert die E-Mail eines Nutzers.
*/
const verifyEmail = async (data: Record<string, any>) => {
    const { hash } = data;

    if(!hash) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const verification = await EmailVerification.findOne({ hash });

    if(!verification) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const id = verification.userId;
    const user = await User.findOne({ id });

    if(user) {
        user.emailUnverified = undefined;
        await user.save();
    }

    verification.delete();
};

export {
    verifyEmail
};