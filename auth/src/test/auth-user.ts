import request from 'supertest';
import { app } from '../app';

class AuthUser {

    static signin = async (): Promise<string[]> => {
        const email = 'test@email.com';
        const password = '123123';

        const response = await request(app)
            .post('/api/users/signup')
            .send({
                email,
                password
            })
            .expect(201);

        return response.get('Set-Cookie');
    };
}

export { AuthUser };