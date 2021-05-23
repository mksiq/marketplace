import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'someEmail@test.com',
      password: 'somePassword',
    })
    .expect(201);
});

it('returns a 400 on invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalidEmail',
      password: 'somePassword',
    })
    .expect(400);
});

it('returns a 400 on too short password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalidEmail@aaa.aaa',
      password: 's',
    })
    .expect(400);
});

it('returns a 400 on missing email password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'someEmail@test.com',
      password: '',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'somePassword',
    })
    .expect(400);
});

it('does not allow duplicated emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'someEmail@test.com',
      password: 'somePassword',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'someEmail@test.com',
      password: 'somePassword',
    })
    .expect(400);
});

it('sets a cookie after completed signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'someEmail@test.com',
      password: 'somePassword',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
