/**
    Error der Amira API.
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

    /**
        Optionaler untergeordneter Fehlercode.
    */
    public readonly subcode?: string;
    // #endregion
    
    /**
        Konstruktor von `AmiraError`.
    */
    constructor(status: number, code: string, subcode?: string) {
        super();

        this.status = status;
        this.code = code;
        this.subcode = subcode;
    }
}

export default AmiraError;