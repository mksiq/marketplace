import express, { json } from 'express';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './routes/middlewares/error-handler';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());

app.listen(3000, () => {
  console.log('Listening on 3000.');
});

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({
    message: 'Auth Service listening for requests',
  });
});
