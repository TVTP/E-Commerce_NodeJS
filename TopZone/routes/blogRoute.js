const express = require('express');
const { createBlog, updateBlog, deleteBlog, getaBlog, getallBlog } = require('../controller/blogCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/',authMiddleware,isAdmin ,createBlog);
router.get('/all-blog',getallBlog);
router.get('/:id',getaBlog);
router.put('/:id',authMiddleware,isAdmin ,updateBlog);
router.delete('/:id',authMiddleware,isAdmin ,deleteBlog);


module.exports = router;