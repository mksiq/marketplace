import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<Array<string>>;
    }
  }
}

let mongodb: any;

beforeAll(async () => {
  mongodb = new MongoMemoryServer();
  process.env.JWT_KEY = 'tHiSiSaSeCrEt';
  const mongoUri = await mongodb.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongodb.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'maicke@aaaa.aa';
  const password = '12345';

  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  return res.get('Set-Cookie');
};
