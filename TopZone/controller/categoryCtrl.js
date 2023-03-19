const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbid');

const createCategory = asyncHandler(async ( req,res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }
});

const deleteCategory = asyncHandler(async ( req,res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }
});

const updateCategory = asyncHandler(async ( req,res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = { deleteCategory,updateCategory,createCategory};