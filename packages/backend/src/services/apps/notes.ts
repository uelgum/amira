import User from "@models/user";
import Notes from "@models/apps/notes";
import AmiraError from "@structs/amiraError";
import { Locals as Payload } from "express";

// Services
import { generateId } from "@services/id";
import { encrypt, decrypt } from "@services/crypto";

/**
    Ruft die Notizen ab.
*/
const fetchNotes = async (payload: Payload) => {
    const userId = payload.id;
    const passwordKey = payload.key;

    const user = await User.findOne({ id: userId });
    const notes = await Notes.findOne({ userId });

    if(!notes) {
        throw new AmiraError(400, "APP_ERROR", "NOTES_NOT_FOUND");
    }

    const userKey = decrypt(user.userKey, passwordKey);
    const content = decrypt(notes.content, userKey);

    return content;
};

/**
    Aktualisiert die Notizen.
*/
const updateNotes = async (payload: Payload, data: Record<string, any>) => {
    const userId = payload.id;
    const passwordKey = payload.key;

    const { content } = data;

    if(!content) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const notesExists = await Notes.exists({ userId });

    if(!notesExists) {
        const notes = new Notes({
            id: generateId(),
            userId,
            content: ""
        });

        await notes.save();
    }

    const user = await User.findOne({ id: userId });
    const notes = await Notes.findOne({ userId });

    const userKey = decrypt(user.userKey, passwordKey);

    notes.content = encrypt(content, userKey);

    await notes.save();
};

export {
    fetchNotes,
    updateNotes
};