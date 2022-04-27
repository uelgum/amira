import { Response } from "express";

const sendData = (res: Response, data: Record<string, any>) => {
    res.status(200);
    res.json({
        status: "ok",
        data
    });
};

const sendError = (res: Response, error: any) => {
    const status = error.status || 500;
    const code = error.code || "INTERNAL_ERROR";

    res.status(status);
    res.json({
        status: "err",
        err: {
            status,
            code
        }
    });
};

export {
    sendData,
    sendError
};