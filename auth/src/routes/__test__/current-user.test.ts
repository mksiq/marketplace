import request from 'supertest';
import { app } from '../../app';

it('contains response with current user', async () => {
  const cookie = await global.signin();

  const responseCurrentUser = await request(app).get('/api/users/currentUser').set('Cookie', cookie).send().expect(200);

  expect(responseCurrentUser.body.currentUser.email).toEqual('maicke@aaaa.aa');
});

it('returns null if not authenticated', async () => {
  const responseCurrentUser = await request(app).get('/api/users/currentUser').send().expect(200);

  expect(responseCurrentUser.body.currentUser).toBeNull();
});
