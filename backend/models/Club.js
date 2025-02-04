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
    managers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }, ],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: false
    }, ],
    location: {
        type: String,
        required: false,
    },
    members: [{
        name: { type: String, required: false, },
        email: { type: String, required: false, },
        status: { type: String, enum: ["pending", "accepted"], default: "pending" }
    }, ],
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
        required: true,
    },
    organiser: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("club", ClubSchema);