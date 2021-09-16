import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user';
import { AuthUser } from '../../test/auth-user';

it('response with details about the current user', async () => {
    const cookie = await AuthUser.signin();
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@email.com');
    expect(response.body.currentUser.id).toBeDefined();
});

it('return a 400 when the current user is not found in the database', async () => {
    const cookie = await AuthUser.signin();

    await User.deleteOne({ email: "test@email.com" });

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .expect(400);

    expect(response.body.errors).toEqual([{
        message: 'Session is invalid'
    }]);
});