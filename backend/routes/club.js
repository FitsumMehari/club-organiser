const router = require("express").Router();
const dotenv = require("dotenv");

const fs = require("fs");
const path = require("path")

dotenv.config();

const Club = require("../models/Club");
const Organiser = require('../models/User')
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

const transporter = require("./transporter");

const cloudinaryFileUpload = require('./cloudinaryFileUpload');
const multer = require('multer');

// Configure Multer for file upload handling
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Create an 'uploads' folder in your project
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); // Or a simpler filename
//     }
// });
const upload = multer({ storage: storage })

// Add New Club
router.post("/", verifyTokenAndAuthorization, async(req, res, next) => {
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
router.get("/", async(req, res, next) => {
    try {
        const allClubs = await Club.find({});
        const updatedAllClubs = [];

        for (const club of allClubs) {
            let theirOrganiser = await Organiser.findById(club.managers[0]);
            if (theirOrganiser) {
                const updatedClub = {...club._doc, organiser: theirOrganiser.username }; // Create a *new* object
                updatedAllClubs.push(updatedClub);

            } else {
                updatedAllClubs.push(club); // Keep the original if no club is found
            }
        }
        // console.log(updatedAllClubs[0]);

        res.status(200).json(updatedAllClubs);
    } catch (error) {
        next(error);
    }
});

// Get Single Club By ID Of Club
router.get("/:clubID", async(req, res, next) => {
    if (!req.params.clubID) {
        res.status(400).json({ message: "Invalid club ID!" });
    } else {
        try {
            const existingClub = await Club.findById(req.params.clubID)
            res.status(200).json(existingClub);
        } catch (error) {
            next(error);
        }
    }
});

// Update A CLub By Club ID
router.put("/:clubID", verifyToken, upload.single("logo"), async(req, res, next) => {


    let club = JSON.parse(req.body.club)


    try {
        if (req.file) {
            const tempfileName = req.file.originalname;
            const tempfileURL = req.file.path;
            const tempsavedFile = await cloudinaryFileUpload.setSavedFile(tempfileName, tempfileURL);

            const updatedClub = await Club.findByIdAndUpdate(req.params.clubID, {
                name: club.name,
                category: club.category,
                description: club.description,
                status: club.status,
                location: club.location,
                logo: tempsavedFile.fileURL,
            });
            const newValues = await Club.findOne(updatedClub._id);

            fs.rmSync(path.join(__dirname, '..', 'uploads', tempsavedFile.fileName))

            res.status(200).json({
                message: "Update Successful!",
                newValues,
            });

        } else {
            const updatedClub = await Club.findByIdAndUpdate(req.params.clubID, {
                name: club.name,
                category: club.category,
                description: club.description,
                status: club.status,
                location: club.location
            });
            const newValues = await Club.findOne(updatedClub._id);

            res.status(200).json({
                message: "Update Successful!",
                newValues,
            });
        }

    } catch (error) {
        next(error);
    }
});

// Update A CLub By Club ID When A Request To Be A Member is Accepted By The Club Managers
router.put("/approvemembership", verifyToken, async(req, res, next) => {
    try {
        const club = await Club.findById(req.body._id);

        const mailOptions = {
            from: process.env.OTP_EMAIL,
            to: req.body.email,
            subject: "Membership Request",
            text: `Your request to join ${club.name} club has been approved by the managers.`,
        };

        const pendingRequest = club.members.find(member => member.email === req.body.email);
        if (pendingRequest) {
            pendingRequest.status = "accepted"
            await club.save()
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Membership request approved!' });
        }


        res.status(400).json({
            message: "Request not found!",
        });
    } catch (error) {
        next(error);
    }
});

// Update A CLub By Club ID When A Request To Be A Member is Accepted By The Club Managers
router.post("/requestmembership/:clubID", async(req, res, next) => {
    if (req.params.clubID) {
        try {
            const club = await Club.findById(req.params.clubID);

            const existingRequest = club.members.find(member => member.email === req.body.email);
            if (existingRequest) {
                return res.status(200).json({ message: 'Member request already exists' });
            }

            club.members.push({ name: req.body.name, email: req.body.email, status: "pending" });
            await club.save();

            res.status(201).json({ message: 'Member request submitted successfully' });

        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: "Invalid club ID!" });
    }
});

// Delete A CLub By Club ID
router.delete("/:clubID", verifyToken, async(req, res, next) => {
    try {
        await Club.findByIdAndDelete(req.params.clubID);

        res.status(200).json({
            message: "Delete Successful!",
        });
    } catch (error) {
        next(error);
    }
});



module.exports = router;