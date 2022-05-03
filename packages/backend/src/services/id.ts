import snowflake from "@controller/snowflake";

/**
    Generiert eine Snowflake-ID.
*/
const generateId = () => {
    return snowflake.generate();
};

export {
    generateId
};