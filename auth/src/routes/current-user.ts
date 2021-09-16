import express, { Request, Response } from 'express';
import BussinessError from '../errors/bussiness-error';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth,
    async (req: Request, res: Response) => {
        const existingUser = await User.findOne({ email: req.currentUser?.email });
        if (!existingUser) {
            throw new BussinessError('Session is invalid');
        }
        return res.send({ currentUser: existingUser });
    });

export { router as currentUserRouter };

