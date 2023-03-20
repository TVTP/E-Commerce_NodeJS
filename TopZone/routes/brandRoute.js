const express = require('express');
const { createBrand, getallBrand, getaBrand, updateBrand, deleteBrand } = require('../controller/brandCtrl');
const { } = require('../controller/categoryCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/' ,authMiddleware, isAdmin, createBrand);
router.get('/all-brand' ,getallBrand);
router.get('/:id' ,getaBrand);
router.put('/:id' ,authMiddleware, isAdmin, updateBrand);
router.delete('/:id' ,authMiddleware, isAdmin, deleteBrand);

module.exports = router;

