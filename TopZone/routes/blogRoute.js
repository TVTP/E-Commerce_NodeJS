const express = require('express');
const { createBlog, updateBlog, deleteBlog, getaBlog, getallBlog, likeBlog, dislikeBlog, uploadImages } = require('../controller/blogCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImages');
const router = express.Router();


router.post('/',authMiddleware,isAdmin ,createBlog);
router.get('/all-blog',getallBlog);
router.put(
    '/upload/:id',
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images",2),
    blogImgResize,
    uploadImages)
router.get('/:id',getaBlog);

router.put('/likes',authMiddleware,likeBlog);
router.put('/dislikes',authMiddleware,dislikeBlog);

router.put('/:id',authMiddleware,isAdmin ,updateBlog);
router.delete('/:id',authMiddleware,isAdmin ,deleteBlog);


module.exports = router;