import snowflake from "@controller/snowflake";

const generateId = () => {
    return snowflake.generate();
};

export {
    generateId
};