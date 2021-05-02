import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 40 })
      .withMessage(
        'Please provide a password with at least 5 chars and at most 40 chars'
      ),
  ],
  (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    res.send('User signed up.');
  }
);

export { router as signupRouter };
