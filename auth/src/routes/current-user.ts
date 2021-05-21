import express from 'express';
import { currentUser } from './middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null }); // so it does not return undefined
});

export { router as currentUserRouter };
