const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken } = require('../middlewares/auth');

router.get('/:id/history', verifyToken, customerController.getPurchaseHistory);
router.get('/:id/debt', verifyToken, customerController.getDebt);

router.get('/', verifyToken, customerController.getAll);
router.get('/:id', verifyToken, customerController.getById);

router.post('/', verifyToken, customerController.create);
router.put('/:id', verifyToken, customerController.update);
router.delete('/:id', verifyToken, customerController.delete);

module.exports = router; 