import Snowflake from "snowflake-id";

/**
    Offset für die ID.
*/
const OFFSET = (2020 - 1970) * 31536000 * 1000;

/**
    Generator für Snowflake-IDs.
*/
const snowflake = new Snowflake({
    mid: 1,
    offset: OFFSET
});

export default snowflake;