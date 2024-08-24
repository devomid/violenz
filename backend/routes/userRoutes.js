const express = require('express');
const verifyToken = require('../middlewares/tokenVerification');
const { signupUser, signinUser, verifyUser } = require('../controllers/userController');

const router = express.Router();

router.post('/signin', signinUser);
router.post('/signup', signupUser);
router.post('/verify', verifyUser);

module.exports = router;