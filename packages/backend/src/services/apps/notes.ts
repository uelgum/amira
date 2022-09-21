import AmiraError from "@structs/error";
import User from "@models/user";
import Notes from "@models/apps/notes";
import exists from "@utils/exists";
import { generateId } from "@services/id";

// Types
import type { Request } from "express";
import { decrypt, encrypt } from "@services/crypto";

/**
    Ruft die Notizen eines Nutzers ab.
*/
const getNotes = async (req: Request) => {
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

    const notes = await Notes.findOne({
        where: {
            userId
        }
    });

    if(!notes) {
        throw new AmiraError(404, "NOTES_NOT_FOUND");
    }

    const userKey = decrypt(user.keys.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    const decryptedContent = decrypt(notes.content, userKey);

    return {
        decryptedContent
    };
};

/**
    Aktualisiert die Notizen eines Nutzers.
*/
const updateNotes = async (req: Request) => {
    const userId = req.user.id;
    const passwordKey = req.user.key;

    const { content } = req.body;

    if(!content) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    if(content.length > 1000) {
        throw new AmiraError(400, "NOTES_LENGTH_EXCEEDED");
    }

    const notesExists = await exists(Notes, {
        userId
    });

    if(!notesExists) {
        await Notes.create({
            id: generateId(),
            userId,
            content: ""
        });
    }

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const notes = await Notes.findOne({
        where: {
            userId
        } 
    });

    if(!notes) {
        throw new AmiraError(404, "NOTES_NOT_FOUND");
    }

    const userKey = decrypt(user.keys.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    notes.content = encrypt(content, userKey);

    await notes.save();
};

export {
    getNotes,
    updateNotes
};