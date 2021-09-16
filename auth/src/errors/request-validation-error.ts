import { ValidationError } from "express-validator";
import { CustomError, ErrorMessage } from "./custom-error";

export default class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(message: string, private errors: ValidationError[]) {
        super(message);

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    getErrors(): ErrorMessage[] {
        return this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param
            };
        });
    }
}