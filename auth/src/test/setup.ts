import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongodb: any;

beforeAll(async () => {
  mongodb = new MongoMemoryServer();
  process.env.JWT_KEY = 'change-this-jwt-key-in-use';
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
