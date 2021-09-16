import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@email.com',
            password: '123123'
        })
        .expect(400);

    expect(response.body.errors).toEqual([{
        message: 'Invalid credentials'
    }]);
});

it('fails when an incorect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@email.com',
            password: '123123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@email.com',
            password: 'asdasd'
        })
        .expect(400);

    expect(response.body.errors).toEqual([{
        message: 'Invalid credentials'
    }]);
});

it('responds with a cookie when given valid credentionals', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@email.com',
            password: '123123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@email.com',
            password: '123123'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
    expect(response.body.email).toEqual('test@email.com');
    expect(response.body.id).toBeDefined();
});