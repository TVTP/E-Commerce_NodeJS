const Voucher = require('../models/voucherModel')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbid');

const createVoucher = asyncHandler(async (req, res) => {
    try {
        const newVoucher = await Voucher.create(req.body);
        res.json(newVoucher);
    } catch (error) {
        throw new Error(error)
    }
});


const updateVoucher = asyncHandler(async ( req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedVoucher = await Voucher.findOneAndUpdate(id, req.body, {
            new: true,
         });
         console.log(updatedVoucher);
         res.json(updatedVoucher);
    } catch (error) {
        throw new Error(error)
    }
});

const deleteVoucher = asyncHandler(async ( req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedVoucher = await Voucher.findOneAndDelete(id);
        res.json(deletedVoucher);
    } catch (error) {
        throw new Error(error)
    }
});


const getaVoucher = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
       const findVoucher = await Voucher.findById(id);
       res.json(findVoucher);
    } catch (error) {
       throw new Error(error);
    }
 });

 const getallVoucher = asyncHandler(async (req, res) => {
   
    try {
       const findAllVoucher = await Voucher.find();
       res.json(findAllVoucher);
    } catch (error) {
       throw new Error(error);
    }
 })
 module.exports = { getallVoucher,getaVoucher,deleteVoucher,updateVoucher,createVoucher};
