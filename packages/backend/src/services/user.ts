import AmiraError from "@structs/error";
import User from "@models/user";
import Email from "@models/email";
import { validatePasswordResetData } from "@services/validator";
import { decrypt, derivePasswordKey, encrypt, generateRecoveryKey, hashPassword } from "@services/crypto";

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

/**
    Setzt das Passwort zurück.
*/
const resetPassword = async (data: Record<string, any>) => {
    const isValid = validatePasswordResetData(data);

    if(!isValid) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const { actionId, recoveryCode, newPassword, newPasswordConfirm } = data;

    const reset = await Email.findOne({
        where: {
            actionId
        }
    });

    if(!reset) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    await reset.destroy();

    const user = await User.findOne({
        where: {
            id: reset.userId
        }
    });

    if(!user) {
        throw new AmiraError(400, "USER_NOT_FOUND");
    }

    if(newPassword !== newPasswordConfirm) {
        throw new AmiraError(400, "MISMATCHED_PASSWORDS");
    }

    const oldPasswordKey = decrypt(user.recoveryKey, recoveryCode);

    if(oldPasswordKey.length === 0) {
        throw new AmiraError(400, "INVALID_RECOVERY_CODE");
    }

    const newPasswordHash = await hashPassword(newPassword);
    const newPasswordKey = derivePasswordKey(newPassword, user.createdAt);

    // Neuen Reovery-Code und -Key generieren
    const [ newRecoveryCode, newRecoveryKey ] = generateRecoveryKey(newPasswordKey);

    // User-Key mit altem Passwort-Key entschlüsseln und mit neuem Passwort-Key verschlüsseln
    const userKey = encrypt(
        decrypt(user.userKey, oldPasswordKey),
        newPasswordKey
    );

    user.password = newPasswordHash;
    user.recoveryKey = newRecoveryKey;
    user.userKey = userKey;

    await user.save();

    return newRecoveryCode;
};

export {
    verifyEmail,
    resetPassword
};