const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

router.get('/users', controllers.getUsers);
router.get('/users/:userId', controllers.getUserById);
router.post('/users/login', controllers.login);
router.post('/batches', controllers.createBatch);
router.get('/batches', controllers.getBatches);
router.get('/batches/:batchId', controllers.getBatchById);
router.post('/samples/:batchId', controllers.createSample);
router.get('/products', controllers.getProducts);

module.exports = router;
