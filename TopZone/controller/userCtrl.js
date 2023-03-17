const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbid');

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create a new User
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        //user already exists

        throw new Error("User Already Exists");

    }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(_id,
            {
                firstname: req.body?.firstname,
                lastname: req.body?.lastname,
                mobile: req.body?.mobile,
                email: req.body?.email,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error);
    }

});

//get all user
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers);
    } catch (error) {
        throw new Error(error)
    }
});
//get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});


const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteaUser = await User.findOneAndDelete(id);
        res.json({
            deleteaUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const block = await User.findByIdAndUpdate(id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User blocked",
        });
    } catch (error) {
        throw new Error(error)
    }
});
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User Unblocked",
        });
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = { unblockUser, blockUser, createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser };