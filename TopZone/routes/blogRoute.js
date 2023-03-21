const express = require('express');
const { createBlog, updateBlog, deleteBlog, getaBlog, getallBlog, likeBlog, dislikeBlog } = require('../controller/blogCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/',authMiddleware,isAdmin ,createBlog);
router.get('/:id',getaBlog);
router.get('/all-blog',getallBlog);
router.put('/likes',authMiddleware,likeBlog);
router.put('/dislikes',authMiddleware,dislikeBlog);

router.put('/:id',authMiddleware,isAdmin ,updateBlog);
router.delete('/:id',authMiddleware,isAdmin ,deleteBlog);


module.exports = router;