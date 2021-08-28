const router = require('express').Router();
const { requireAuth } =require('../middleware/auth.middleware');
const serverControllers = require('../controllers/server.controllers');

router.route('/create-server')
    .post(requireAuth, serverControllers.serverPost);

router.route('/create-model')
    .post(requireAuth, serverControllers.modelPost);
module.exports = router;
