import { CustomError, ErrorMessage } from "./custom-error";

const errorMessage = 'Not Found';

export default class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super(errorMessage);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    getErrors(): ErrorMessage[] {
        return [{ message: errorMessage }];
    }
}