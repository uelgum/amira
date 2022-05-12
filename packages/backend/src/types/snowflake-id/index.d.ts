declare module "snowflake-id" {
    export type SnowflakeOptions = {
        mid?: number;
        offset?: number;
    };

    export default class SnowflakeId {
        constructor(options?: SnowflakeOptions);
        public generate(): string;
    }
}