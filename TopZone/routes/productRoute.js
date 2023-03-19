const express = require('express');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct } = require('../controller/productCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct)
router.get('/all-product', getAllProduct)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.get('/:id', getaProduct)




module.exports = router;