const router = require('express').Router();
const indexController = require('../controllers/index.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.route('/')
    .get(requireAuth, indexController.indexGet);
module.exports = router;
