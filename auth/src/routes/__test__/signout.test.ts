import request from 'supertest';
import { app } from '../../app';
import { AuthUser } from '../../test/auth-user';

it('cleans a cookie after signing out', async () => {
    const cookie = await AuthUser.signin();
    const response = await request(app)
        .post('/api/users/signout')
        .set('Cookie', cookie)
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).toContain('express:sess=;');
});

it('return a 400 error when singing out without a session', async () => {
    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(400);

    expect(response.body.errors).toEqual([{
        message: 'Session is invalid'
    }]);
});