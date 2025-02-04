const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["organiser", "admin"],
        default: "organiser",
    },
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "club",
        required: false,
    }],
    generatedOTP: {
        type: String,
        required: false,
    },
    profilePic: {
        type: String,
        required: false,
    },
    clubName: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("user", UserSchema);