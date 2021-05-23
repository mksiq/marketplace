import request from 'supertest';
import { app } from '../../app';

it('returns a 400 on unsigned user', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'someEmail@test.com',
      password: 'somePassword',
    })
    .expect(400);
});

it('returns 400 when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'someEmail@test.com',
      password: 'somePassword',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'someEmail@test.com',
      password: 'asdasd',
    })
    .expect(400);
});

it('returns 200 when all goes well', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'maicke@aaaa.aa',
      password: '12345',
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'maicke@aaaa.aa',
      password: '12345',
    })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
