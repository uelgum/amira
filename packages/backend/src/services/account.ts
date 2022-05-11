import EmailVerification from "@models/emailVerification";
import User from "@models/user";
import AmiraError from "@structs/amiraError";

/**
    Verifiziert die E-Mail eines Nutzers.
*/
const verifyEmail = async (data: Record<string, any>) => {
    const { code } = data;

    if(!code) {
        throw new AmiraError(400, "VERIFICATION_ERROR", "INVALID_DATA");
    }

    const verification = await EmailVerification.findOne({ code });

    if(!verification) {
        throw new AmiraError(400, "VERIFICATION_ERROR", "INVALID_CODE");
    }

    const userId = verification.id;
    const user = await User.findOne({ id: userId });

    if(!user) {
        throw new AmiraError(400, "VERIFICATION_ERROR", "INVALID_ID");
    }

    user.emailUnverified = undefined;

    verification.delete();
    await user.save();
};

export {
    verifyEmail
};