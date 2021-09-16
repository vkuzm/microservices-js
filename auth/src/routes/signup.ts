import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import BussinessError from '../errors/bussiness-error';
import { requestValidation } from '../middlewares/validation-request';
import { User } from '../models/user';

const router = express.Router();

const requestFieldsValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
];

interface SignUpRequest {
    email: string,
    password: string
}

router.post('/api/users/signup', requestFieldsValidation, requestValidation,
    async (req: Request, res: Response) => {
        const { email, password } = req.body as SignUpRequest;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BussinessError('User with this email is already existed');
        }

        const user = User.build({ email, password });
        await user.save();

        const jwtToken = jwt.sign({
            userid: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: jwtToken
        };

        res.status(201).send(user);
    });

export { router as signupRouter };

