const router = require('express').Router();
const authControllers = require('../controllers/auth.controllers');

router.route('/login')
    .get(authControllers.loginGet)
    .post(authControllers.loginPost);

router.route('/signup')
    .get(authControllers.signupGet)
    .post(authControllers.signupPost);

router.route('/logout')
    .get(authControllers.logout);

module.exports = router;