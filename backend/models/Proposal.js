const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
    organiser: {
        username: String,
        email: String,
        phone: String
    },
    club: {
        name: String,
        category: {
            type: String,
            enum: ["undefined", "social", "academic", "management"],
            default: "undefined",
        },
        description: String
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("proposal", ProposalSchema);