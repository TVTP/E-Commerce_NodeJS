const express = require('express');
const { createVoucher, getallVoucher, updateVoucher ,deleteVoucher, getaVoucher} = require('../controller/voucherCtrl');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');


router.post('/' ,authMiddleware,isAdmin, createVoucher);
router.get('/all-voucher',authMiddleware,isAdmin,getallVoucher);
router.put('/:id',authMiddleware,isAdmin,updateVoucher);
router.delete('/:id',authMiddleware,isAdmin,deleteVoucher);
router.get('/:id',authMiddleware,isAdmin,getaVoucher);

module.exports = router;