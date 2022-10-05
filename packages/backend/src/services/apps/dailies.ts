import AmiraError from "@structs/error";
import Dailies from "@models/apps/dailies";
import User from "@models/user";
import { decrypt, encrypt } from "@services/crypto";
import { generateId } from "@services/id";

// Types
import type { Request } from "express";

/**
    Ruft alle Dailies eines Nutzers ab.
*/
const getDailies = async (req: Request) => {
    const userId = req.user.id;
    const passwordKey = req.user.key;

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const rawDailies = await Dailies.findAll({
        where: {
            userId
        }
    });

    if(rawDailies.length === 0) {
        throw new AmiraError(404, "DAILIES_NOT_FOUND");
    }

    const userKey = decrypt(user.keys.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    const dailies = rawDailies.map((daily) => {
        return {
            id: daily.id,
            content: decrypt(daily.content, userKey),
            done: daily.done,
            createdAt: daily.createdAt
        };
    });

    return {
        dailies
    };
};

/**
    Fügt eine neue Daily hinzu.
*/
const addDaily = async (req: Request) => {
    const userId = req.user.id;
    const passwordKey = req.user.key;

    const { content } = req.body;

    if(!content) {
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

    const userKey = decrypt(user.keys.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    const daily = await Dailies.create({
        id: generateId(),
        userId,
        content: encrypt(content, userKey),
        done: false,
        createdAt: Date.now()
    });

    await daily.save();

    return {
        id: daily.id
    };
};

/**
    Löscht eine Daily eines Nutzers.
*/
const deleteDaily = async (req: Request) => {
    const userId = req.user.id;

    const { dailyId } = req.params;

    if(!dailyId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const daily = await Dailies.findOne({
        where: {
            id: dailyId,
            userId
        }
    });

    if(!daily) {
        throw new AmiraError(404, "DAILY_NOT_FOUND");
    }

    await daily.destroy();
};

export {
    getDailies,
    addDaily,
    deleteDaily
};