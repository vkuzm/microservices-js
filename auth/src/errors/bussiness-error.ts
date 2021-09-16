import { CustomError, ErrorMessage } from "./custom-error";

export default class BussinessError extends CustomError {
    statusCode = 400;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, BussinessError.prototype);
    }

    getErrors(): ErrorMessage[] {
        return [{ message: this.message }];
    }
}