const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

const Club = require("../models/Club");
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

// Add New Club
router.post("/new", verifyTokenAndAuthorization, async(req, res, next) => {
    if (!req.body.name ||
        !req.body.category ||
        !req.body.description ||
        !req.body.managers ||
        !req.body.status
    ) {
        res.status(200).json({ message: "Please fill the required inputs!" });
    } else {
        // Check if club name exists
        const existingClub = await Club.findOne({
            name: req.body.name,
        });

        if (!!existingClub) {
            return res.status(200).json({ message: "Club name already taken!" });
        }

        const newClub = new Club({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            managers: req.body.managers,
            members: req.body.members,
            status: req.body.status,
            logo: req.body.logo,
            location: req.body.location,
        });
        try {
            const savedClub = await newClub.save();

            res.status(201).json({ message: "Club Saved Successfully!", savedClub });
        } catch (err) {
            return next(err);
        }
    }
});

// Get All Clubs
router.get("/all", verifyTokenAndAuthorization, async(req, res, next) => {
    try {
        const allClubs = await Club.find({});
        res.status(200).json(allClubs);
    } catch (error) {
        next(error);
    }
});

// Get Single Club By ID Of Manager
router.get("/bymanagerid", verifyToken, async(req, res, next) => {
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

// Update A CLub By Club ID
router.put("/update", verifyToken, async(req, res, next) => {
    try {
        const updatedClub = await Club.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            managers: req.body.managers,
            members: req.body.members,
            status: req.body.status,
            logo: req.body.logo,
            location: req.body.location,
        });

        const newValues = await Club.findOne(req.body.id)

        res.status(200).json({
            message: "Update Successful!",
            newValues,
        });
    } catch (error) {
        next(error);
    }
});

// Delete A CLub By Club ID
router.delete("/delete", verifyToken, async(req, res, next) => {
    try {
        const updatedClub = await Club.findByIdAndDelete(req.body._id);

        res.status(201).json({
            message: "Delete Successful!",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;