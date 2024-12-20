const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controller');
const {signupSchema, loginSchema} = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/').get(authControllers.Home);
router.route('/register').post(validate(signupSchema), authControllers.Register);
router.route('/login').post(validate(loginSchema), authControllers.Login);
router.route('/user').get(authMiddleware, authControllers.UserData);

module.exports = router;