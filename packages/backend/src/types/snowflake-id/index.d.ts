declare module "snowflake-id" {
    export type SnowflakeOptions = {
        mid?: number;
        offset?: number;
    };
    
    export default class Snowflake {
        constructor(options: SnowflakeOptions);
        public generate(): string;
    }
}