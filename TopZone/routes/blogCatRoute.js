const express = require('express');
const { createCategory, updateCategory ,deleteCategory, getaCategory, getallCategory} = require('../controller/blogCatCrtl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/' ,authMiddleware, isAdmin, createCategory);
router.get('/all-blog-category' ,getallCategory);
router.get('/:id' ,getaCategory);
router.put('/:id' ,authMiddleware, isAdmin, updateCategory);
router.delete('/:id' ,authMiddleware, isAdmin, deleteCategory);

module.exports = router;

