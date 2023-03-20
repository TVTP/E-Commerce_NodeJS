const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbid');


const createBrand = asyncHandler(async ( req,res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error)
    }
});

const updateBrand = asyncHandler(async ( req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedBrand = await Brand.findOneAndUpdate(id, req.body, {
            new: true,
         });
         console.log(updatedBrand);
         res.json(updatedBrand);
    } catch (error) {
        throw new Error(error)
    }
});

const deleteBrand = asyncHandler(async ( req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedBrand = await Brand.findOneAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error)
    }
});


const getaBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
       const findBrand = await Brand.findById(id);
       res.json(findBrand);
    } catch (error) {
       throw new Error(error);
    }
 });

 const getallBrand = asyncHandler(async (req, res) => {
    validateMongoDbId(id);
    try {
       const findAllBrand = await Brand.find();
       res.json(findAllBrand);
    } catch (error) {
       throw new Error(error);
    }
 })
 module.exports = { getallBrand,getaBrand,deleteBrand,updateBrand,createBrand};