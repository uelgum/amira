import { Snowflake } from "nodejs-snowflake";

/**
    Epoche der Snowflake-IDs.
    Stellt den 01. Januar 2022 00:00:00 dar.
*/
const EPOCH = 1640995200;

/**
    Generator für Snowflake-IDs.
*/
const snowflake = new Snowflake({
    custom_epoch: EPOCH
});

/**
    Generiert eine Snowflake-ID.
*/
const generateId = () => {
    return snowflake
        .getUniqueID()
        .toString();
};

export {
    generateId
};