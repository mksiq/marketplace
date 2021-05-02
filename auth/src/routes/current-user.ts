import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('User test.');
});

export { router as currentUserRouter };
