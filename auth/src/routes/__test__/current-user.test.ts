import request from 'supertest';
import { app } from '../../app';

it('contains response with current user', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'maicke@aaaa.aa',
      password: '12345',
    })
    .expect(201);

  const cookie = res.get('Set-Cookie');

  const responseCurrentUser = await request(app).get('/api/users/currentUser').set('Cookie', cookie).send().expect(200);

  expect(responseCurrentUser.body.currentUser.email).toEqual('maicke@aaaa.aa');
});
