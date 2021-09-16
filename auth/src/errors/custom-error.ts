
export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        console.log(message);
    }

    abstract getErrors(): ErrorMessage[];
}

export interface ErrorMessage {
    message: string,
    field?: string
}