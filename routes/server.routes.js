const router = require('express').Router();
const { requireAuth } = require('../middleware/auth.middleware');
const serverControllers = require('../controllers/server.controllers');

router.route('/create-server')
    .post(requireAuth, serverControllers.serverPost);

router.route('/create-model')
    .post(requireAuth, serverControllers.modelPost);

router.route('/:servername/model-schema/:modelname')
    .get(requireAuth, serverControllers.modelSchemaGet);

router.route('/:servername/api/:modelname/all')
    .get(requireAuth, serverControllers.getDataAll);

router.route('/:servername/api/:modelname/:id')
    .get(requireAuth, serverControllers.getDataId);

router.route('/:servername/:modelname/add-data')
    .post(requireAuth, serverControllers.addData);

module.exports = router;
