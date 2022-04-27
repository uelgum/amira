class AmiraError extends Error {
    // #region Attribute
    public readonly code: string;
    public readonly status: number;
    // #endregion

    constructor(code: string, status: number) {
        super();

        this.code = code;
        this.status = status;
    }
}

export default AmiraError;