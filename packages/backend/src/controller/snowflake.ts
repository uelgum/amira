import Snowflake from "snowflake-id";

/**
    Epoche zum Generieren kleinerer IDs (01. Januar 2020).
*/
const EPOCH = 1577836800 * 1000;

/**
    Generator für Snowflake-IDs.
*/
const snowflake = new Snowflake({
    offset: EPOCH
});

export default snowflake;