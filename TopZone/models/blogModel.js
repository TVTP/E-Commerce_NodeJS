const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: String,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisliked: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    dislikes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fyarmama.com%2Fload%2Furl%3Dhttp%3A%2Fproper-cooking.info%2Fimage-not-loaded&psig=AOvVaw2sGuO9R-OBV_wc-JtO2J_-&ust=1679404748693000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPD0jK_M6v0CFQAAAAAdAAAAABAJ"
    },
    author: {
        type: String,
        default: "Admin",
    },
}, {
    toJSON: {
        virtuals: true
    }, toObject: {
        virtuals: true,
    },
    timestamps: true
});

//Export the model
module.exports = mongoose.model('blogs', blogSchema);