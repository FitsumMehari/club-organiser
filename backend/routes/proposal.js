const router = require("express").Router();
const Proposal = require("../models/Proposal");
const Club = require("../models/Club");
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");
const bcrypt = require("bcrypt");

router.post("", async(req, res, next) => {
    try {
        const proposal = {
            organiser: {
                username: req.body.organiser.username,
                email: req.body.organiser.email,
                phone: req.body.organiser.phone,
                password: req.body.organiser.password,
            },
            club: {
                name: req.body.club.name,
                category: req.body.club.category,
                description: req.body.club.description,
            },
        };

        const newProposal = new Proposal({
            ...proposal,
        });

        const savedProposal = await newProposal.save()
        res
            .status(201)
            .json({ message: "Proposal Sent Successfully!", savedProposal });
    } catch (error) {
        next(error);
    }
});

router.post("/acceptProposal/:proposalID", verifyToken, async(req, res, next) => {
    if (!req.params.proposalID) {
        res.status(400).json({ message: "Invalid proposal ID!" });
    } else {
        try {
            const existingProposal = await Proposal.findById(req.params.proposalID)
            const existingClub = await Club.findOne({
                name: existingProposal.club.name
            });

            // saving club info
            if (!!existingClub) {
                return res.status(200).json({ message: "Club name already taken!" });
            }

            const newClub = new Club({
                name: existingProposal.club.name,
                category: existingProposal.club.category,
                description: existingProposal.club.description,
                managers: existingProposal.club.managers,
                members: existingProposal.club.members,
                status: existingProposal.club.status,
                logo: existingProposal.club.logo,
                location: existingProposal.club.location,
            });

            const savedClub = await newClub.save();

            // saving organiser info
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(existingProposal.organiser.password, saltRounds);

            const newUser = new User({
                username: existingProposal.organiser.username,
                password: hashedPassword,
                email: existingProposal.organiser.email,
                phone: existingProposal.organiser.phone,
                userType: "organiser",
                clubs: savedClub._id,
                profilePic: existingProposal.organiser.profilePic,
            });

            const savedUser = await newUser.save();
            const { password, ...otherSavedUserInfo } = savedUser

            // update club info
            newClub.managers.push(savedUser._id)
            await newClub.save();

            res.status(200).json({ "message": "Club and account created succefully! Default password=12345", newClub, otherSavedUserInfo })

        } catch (error) {
            next(error);
        }
    }
})

router.get("/", verifyToken, async(req, res, next) => {
    try {
        const allProposals = await Proposal.find({});
        res.status(200).json(allProposals);
    } catch (error) {
        next(error);
    }
})

router.delete("/:ProposalID", verifyToken, async(req, res, next) => {
    try {
        await Proposal.findByIdAndDelete(req.params.ProposalID);

        res.status(201).json({
            message: "Delete Successful!",
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;