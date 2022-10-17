import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// Intern
import AmiraError from "@structs/error";
import User from "@models/user";
import exists from "@utils/exists";

// Types
import type { Request } from "express";
import type { UploadedFile } from "express-fileupload";

/**
    Größenlimit für Avatare. Entspricht `1MB`.
*/
const AVATAR_FILE_SIZE_LIMIT = 1000000;

/**
    Pfad zum Avatar-Ordner.
*/
const AVATAR_PATH = path.join(__dirname, "../../uploads");

/**
    Ruft den Avatar eines Nutzers ab.
*/
const fetchAvatar = async (req: Request) => {
    const userId = req.params.userId;

    if(!userId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const userExists = await exists(User, {
        id: userId
    });

    if(!userExists) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    return `/media/avatar-${userId}.jpg`;
};

/**
    Aktualisiert den Avatar eines Nutzers.
*/
const uploadAvatar = async (req: Request) => {
    if(!req.files) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const file = req.files.avatar as UploadedFile;

    if(!file) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    if(![ "image/png", "image/jpeg" ].includes(file.mimetype)) {
        throw new AmiraError(400, "INVALID_FILE_EXTENSION");
    }

    if(file.size > AVATAR_FILE_SIZE_LIMIT) {
        throw new AmiraError(400, "FILE_SIZE_LIMIT_EXCEEDED");
    }

    const avatar = await sharp(file.data)
        .resize({
            width: 512,
            height: 512
        })
        .jpeg()
        .toBuffer();

    const fileName = `avatar-${req.user.id}.jpg`;
    const filePath = path.join(AVATAR_PATH, fileName);
    
    try {
        await fs.writeFile(filePath, avatar);
    } catch(error) {
        throw error;
    }
};

export {
    fetchAvatar,
    uploadAvatar
};