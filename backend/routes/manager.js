const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

const Club = require("../models/Club");
const { verifyToken } = require("./verifyToken");



// Get Single Club By ID Of Manager
router.get("/club", verifyToken, async(req, res, next) => {
    if (!req.user._id) {
        res.status(400).json({ message: "Invalid managerID!" });
    } else {
        try {
            const existingClub = await Club.findOne({
                managers: req.user._id,
            });
            res.status(200).json(existingClub);
        } catch (error) {
            next(error);
        }
    }
});

module.exports = router;