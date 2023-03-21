const Blog = require('../models/blogModel');
const validateMongoDbId = require('../utils/validateMongodbid');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');


const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            status: "success",
            newBlog,
        });
    } catch (error) {
        throw new Error(error)
    }

});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedBlog = await Blog.findOneAndUpdate(id, req.body, {
            new: true,
        });
        console.log(updatedBlog);
        res.json(updatedBlog);
    } catch (error) {
        throw new Error(error)
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedBlog = await Blog.findOneAndDelete(id);
        res.json(deletedBlog);
    } catch (error) {
        throw new Error(error)
    }
});


const getaBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findBlog = await Blog.findById(id).populate("likes").populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            { new: true },
        );
        console.log(findBlog);
        res.json(updateViews);
    } catch (error) {
        throw new Error(error);
    }
});

const getallBlog = asyncHandler(async (req, res) => {
    try {
        const findAllBlog = await Blog.find();
        res.json(findAllBlog);
    } catch (error) {
        throw new Error(error);
    }
});
const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    console.log(blogId);
    validateMongoDbId(blogId);

    //Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    //find if the user has liked the post
    const isLiked = blog?.isLiked;
    //find the user if he disliked the pass
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false,
        }, { new: true }
        );
        res.json(blog);
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new: true }
        );
        res.json(blog);
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true,
        }, { new: true }
        );
        res.json(blog);
    }
});
const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    console.log(blogId);
    validateMongoDbId(blogId);

    //Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    //find if the user has liked the post
    const isDisLiked = blog?.isDisliked;
    //find the user if he disliked the pass
    const alreadyLiked = blog?.likes?.find((userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new: true }
        );
        res.json(blog);
    }
    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false,
        }, { new: true }
        );
        res.json(blog);
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: loginUserId },
            isDisliked: true,
        }, { new: true }
        );
        res.json(blog);
    }
});
module.exports = { dislikeBlog,likeBlog, getallBlog, getaBlog, deleteBlog, updateBlog, createBlog};