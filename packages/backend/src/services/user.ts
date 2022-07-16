import AmiraError from "@structs/error";
import User from "@models/user";
import Email from "@models/email";

/**
    Verifiziert die E-Mail eines Nutzers.
*/
const verifyEmail = async (data: Record<string, any>) => {
    const { verificationId } = data;

    if(!verificationId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const verification = await Email.findOne({
        where: {
            actionId: verificationId
        }
    });

    if(!verification) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({
        where: {
            id: verification.userId
        }
    });

    if(!user) {
        throw new AmiraError(400, "USER_NOT_FOUND");
    }

    user.emailVerified = true;
    
    await user.save();
    await verification.destroy();
};

export {
    verifyEmail
};