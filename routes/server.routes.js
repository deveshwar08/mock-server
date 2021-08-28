const { Router } = require('express');
const { requireAuth } =require('../middleware/auth.middleware');
const serverControllers = require('../controllers/server.controllers');
const router = Router();

router.route('/create-server')
    .post(requireAuth, serverControllers.serverPost);

module.exports = router;
