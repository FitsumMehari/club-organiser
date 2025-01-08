const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
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
    organiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "club",
    },
    location: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    attendees: [{
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
}, {
    timestamps: true,
});

module.exports = mongoose.model("event", EventSchema);