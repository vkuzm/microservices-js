import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

interface UserPayload {
    userid: string;
    email: string;
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session?.jwt) {
        try {
            const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
            req.currentUser = payload;
        } catch (error) {
            console.error('Error has occured while verifying JWT token');
        }
    }

    next();
};