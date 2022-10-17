import fs from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import sharp from "sharp";
import pureimage from "pureimage";

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
    Größe des Avatars in `px`.
*/
const AVATAR_SIZE = 512;

/**
    Größe der Felder im Default-Avatar in `px`.
*/
const AVATAR_TILE_SIZE = 64;

/**
    Anzahl der Felder im Default-Avatar.
*/
const AVATAR_TILES = AVATAR_SIZE / AVATAR_TILE_SIZE;

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

/**
    Generiert einen zufälligen Avatar.
*/
const generateAvatar = async (userId: string) => {
    const canvas = pureimage.make(AVATAR_SIZE, AVATAR_SIZE, null);
    const ctx = canvas.getContext("2d");

    let x = 0;
    let y = 0;

    // Zeilen
    for(let i = 0; i < AVATAR_TILES; i++) {
        // Reihen
        for(let j = 0; j < AVATAR_TILES; j++) {
            ctx.fillStyle = (Math.random() < 0.5) ? "#3867F5" : "#2F2E38";
            ctx.fillRect(x, y, AVATAR_TILE_SIZE, AVATAR_TILE_SIZE);
            x += AVATAR_TILE_SIZE;
        }

        x = 0;
        y += AVATAR_TILE_SIZE;
    }

    const fileName = `avatar-${userId}.jpg`;
    const filePath = path.join(AVATAR_PATH, fileName);

    const out = createWriteStream(filePath);

    return pureimage.encodeJPEGToStream(canvas, out);
};

export {
    fetchAvatar,
    uploadAvatar,
    generateAvatar
};