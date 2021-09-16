import { ErrorMessage } from "./custom-error";

const errorMessage = 'Not authorized';

export class NotAuthorizedError extends Error {
    statusCode = 401;

    constructor() {
        super(errorMessage);

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    getErrors(): ErrorMessage[] {
        return [{ message: errorMessage }];
    }
}