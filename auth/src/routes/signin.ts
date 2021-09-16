import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import BussinessError from '../errors/bussiness-error';
import { requestValidation } from '../middlewares/validation-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

const requestFieldsValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password must not be empty')
];

router.post('/api/users/signin', requestFieldsValidation, requestValidation,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const isPasswordMatched = await Password.compare(existingUser.password, password);

            if (isPasswordMatched) {
                const jwtToken = jwt.sign({
                    userid: existingUser.id,
                    email: existingUser.email
                }, process.env.JWT_KEY!);
        
                req.session = {
                    jwt: jwtToken
                };

                return res.send(existingUser);
            }
        }

        throw new BussinessError('Invalid credentials');
    });

export { router as signinRouter };
