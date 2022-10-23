import AmiraError from "@structs/error";
import User from "@models/user";
import Email from "@models/email";
import Block from "@models/block";
import { generateId } from "@services/id";
import { getPresenceStatus } from "@services/presence";
import { validatePasswordResetData } from "@services/validator";
import {
    encrypt,
    decrypt,
    hashPassword,
    derivePasswordKey,
    generateRecoveryKey
} from "@services/crypto";
import exists from "@utils/exists";

// Types
import type { Request } from "express";

/**
    Maximales Alter einer Verifizierung. Entspricht `24h`.
*/
const MAX_VERIFICATION_AGE = 1000 * 60 * 60 * 24;

/**
    Ruft Informationen über einen Nutzer ab.
*/
const getUserInfo = async (req: Request) => {
    const { userId } = req.params;

    if(!userId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    return {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        isAdmin: user.admin,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        presenceStatus: getPresenceStatus(user.id)
    };
};

/**
    Verifiziert die E-Mail eines Nutzers.
*/
const verifyEmail = async (req: Request) => {
    const { actionId } = req.body;

    if(!actionId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const verification = await Email.findOne({
        where: {
            actionId
        }
    });

    if(!verification) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    // Gültigkeit der Action-ID überprüfen
    if(Date.now() - verification.createdAt >= MAX_VERIFICATION_AGE) {
        await verification.destroy();
        throw new AmiraError(400, "ACTION_ID_EXPIRED");
    }

    const user = await User.findOne({
        where: {
            id: verification.userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    user.emailVerified = true;
    
    await user.save();
    await verification.destroy();
};

/**
    Setzt das Passwort zurück.
*/
const resetPassword = async (req: Request) => {
    const isValid = validatePasswordResetData(req.body);

    if(!isValid) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const { actionId, recoveryCode, newPassword, newPasswordConfirm } = req.body;

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

    const oldPasswordKey = decrypt(user.keys.recoveryKey, recoveryCode);

    if(oldPasswordKey.length === 0) {
        throw new AmiraError(400, "INVALID_RECOVERY_CODE");
    }

    const newPasswordHash = await hashPassword(newPassword);
    const newPasswordKey = derivePasswordKey(newPassword, user.createdAt);

    // Neuen Reovery-Code und -Key generieren
    const [ newRecoveryCode, newRecoveryKey ] = generateRecoveryKey(newPasswordKey);

    // User-Key mit altem Passwort-Key entschlüsseln und mit neuem Passwort-Key verschlüsseln
    const userKey = encrypt(
        decrypt(user.keys.userKey, oldPasswordKey),
        newPasswordKey
    );

    user.password = newPasswordHash;
    user.keys.recoveryKey = newRecoveryKey;
    user.keys.userKey = userKey;

    await user.save();

    return newRecoveryCode;
};

/**
    Blockiert einen anderen Nutzer.
*/
const blockUser = async (req: Request) => {
    const userId = req.user.id;
    const { blockedUserId } = req.params;

    if(!blockedUserId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const blockExists = await exists(Block, {
        id: userId,
        blockedUserId
    });

    if(blockExists) {
        throw new AmiraError(400, "USER_ALREADY_BLOCKED");
    }

    const block = await Block.create({
        id: generateId(),
        userId,
        blockedUserId,
        createdAt: Date.now()
    });

    await block.save();
};

/**
    Entblockt einen anderen Nutzer.
*/
const unblockUser = async (req: Request) => {
    const userId = req.user.id;
    const { blockedUserId } = req.params;

    if(!blockedUserId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const block = await Block.findOne({
        where: {
            id: userId,
            blockedUserId
        }
    });

    if(!block) {
        throw new AmiraError(404, "BLOCK_NOT_FOUND");
    }

    await block.destroy();
};

/**
    Fügt den Public Key eines Nutzers hinzu.
*/
const addPublicKey = async (req: Request) => {
    const { userId } = req.params;
    const { publicKey } = req.body;

    if(!userId || !publicKey) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    user.keys = {
        ...user.keys,
        publicKey
    };

    await user.save();
};

/**
    Ruft den Public Key eines Nutzers ab.
*/
const getPublicKey = async (req: Request) => {
    const { userId } = req.params;

    if(!userId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    return {
        id: user.id,
        publicKey: user.keys.publicKey
    };
};

export {
    getUserInfo,
    verifyEmail,
    resetPassword,
    blockUser,
    unblockUser,
    addPublicKey,
    getPublicKey
};