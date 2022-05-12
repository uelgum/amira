import snowflake from "@controller/snowflake";

/**
    Generiert eine einzigartige Snowflake-ID.
*/
const generateId = () => {
    return snowflake.generate();
};

export {
    generateId
};