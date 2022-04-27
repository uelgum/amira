import bcrypt from "bcrypt";
import jwt from "jwt-promisify";
import User from "@models/user";
import { generateId } from "@services/snowflake";
import { validateLoginData, validateRegisterData } from "@services/validation";
import { normalizeString } from "@utils/string";
import AmiraError from "@structs/error";
import config from "@config";

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

const generateToken = (payload: Record<string, any>) => {
    return jwt.sign(payload, config.jwtKey);
};

const login = async (data: Record<string, any>) => {
    // TODO Validation
    const error = validateLoginData(data);

    if(error) {
        throw new AmiraError("INVALID_DATA", 400);
    }

    const { username, password } = data;

    const user = await User.findOne({ username });

    if(!user) {
        throw new AmiraError("INVALID_LOGIN_DATA", 400);
    }

    const isPasswordOk = await bcrypt.compare(password, user.password);

    if(!isPasswordOk) {
        throw new AmiraError("INVALID_LOGIN_DATA", 400);
    }

    if(user.contacts.length > 0) {
        // TODO Notifier-Service für Presence Update
    }

    const payload = {
        id: user.id,
        name: user.firstName,
        role: user.role
    };

    return generateToken(payload);
};

const register = async (data: Record<string, any>) => {
    const error = validateLoginData(data);

    if(error) {
        throw new AmiraError("INVALID_DATA", 400);
    }

    const {
        firstName,
        lastName,
        username,
        email,
        password,
        passwordRetype
    } = data;

    const emailExists = await User.exists({ email });
    const userExists = await User.exists({ username });

    if(emailExists) throw new AmiraError("EMAIL_ALREADY_EXISTS", 400);
    if(userExists) throw new AmiraError("USER_ALREADY_EXISTS", 400);

    if(password !== passwordRetype) {
        throw new AmiraError("MISMATCHED_PASSWORDS", 400);
    }

    const passwordHash = await hashPassword(password);

    const user = new User({
        id: generateId(),
        firstName: normalizeString(firstName),
        lastName: normalizeString(lastName),
        email,
        emailUnverified: true,
        username,
        password: passwordHash,
        role: "user",
        contacts: [],
        createdAt: Date.now()
    });

    await user.save();
};

export {
    login,
    register
};