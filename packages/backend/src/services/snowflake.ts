import Snowflake from "snowflake-id";

const snowflake = new Snowflake({
    mid: 42,
    offset: 1577833200000
});

const generateId = () => {
    return snowflake.generate();
};

export {
    generateId
};