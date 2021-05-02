import express from 'express';

const router = express.Router();

router.post('/api/users/signou', (req, res) => {
  res.send('User signed out.');
});

export { router as signoutRouter };
