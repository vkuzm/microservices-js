import express, { Request, Response } from 'express';
import BussinessError from '../errors/bussiness-error';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    if (!req.session?.jwt) { 
        throw new BussinessError('Session is invalid');
    }

    req.session = null;
    res.send({});
});

export { router as signoutRouter }; 