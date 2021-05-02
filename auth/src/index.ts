import express, { json } from 'express';

const app = express();
app.use(json());

app.listen(3000, () => {
  console.log('Listening on 3000');
});

app.get('/', (req, res) => {
  res.json({
    message: 'Auth Service listening for requests',
  });
});
