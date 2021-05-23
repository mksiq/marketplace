import request from 'supertest';
import { app } from '../../app';

it('has not cookies after signed out', async () => {
  const resSignUp = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'someEmail@test.com',
      password: 'somePassword',
    })
    .expect(201);

  expect(resSignUp.get('Set-Cookie')).toBeDefined();

  const resSignOut = await request(app).post('/api/users/signout').send({}).expect(200);

  expect(resSignOut.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
