import express, { json } from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './routes/middlewares/error-handler';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import mongoose from 'mongoose';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Auth Service listening for requests',
  });
});

app.get('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const init = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on 3000.');
  });
};

init();
