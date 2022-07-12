/**
    Ein Fehler, der bei der API auftreten kann.
*/
class AmiraError extends Error {
    // #region Attribute
    /**
        HTTP-Status des Fehlers.
    */
    public readonly status: number;

    /**
        Fehlercode.
    */
    public readonly code: string;
    // #endregion

    /**
        Konstruktor von `AmiraError`.
    */
    constructor(status: number, code: string) {
        super();

        this.status = status;
        this.code = code;
    }
}

export default AmiraError;