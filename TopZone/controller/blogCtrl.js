const Blog = require('../models/blogModel');
const validateMongoDbId = require('../utils/validateMongodbid');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');


const createBlog = asyncHandler(async (req,res)=> {
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

const updateBlog = asyncHandler(async ( req,res) => {
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

const deleteBlog = asyncHandler(async ( req,res) => {
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
       const findBlog = await Blog.findById(id);
       await Blog.findByIdAndUpdate(id,{
        $inc: { numViews: 1},
       },
       {
        new: true
       });
       res.json(findBlog);
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
 })

 module.exports = { getallBlog,getaBlog,deleteBlog,updateBlog,createBlog};