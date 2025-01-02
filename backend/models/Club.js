const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["undefined", "social", "academic", "management"],
        default: "undefined",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    organisers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }, ],
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    members: [{
        name: String,
        email: String,
    }, ],
    status: {
        type: String,
        enum: ["open", "closed"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("club", ClubSchema);