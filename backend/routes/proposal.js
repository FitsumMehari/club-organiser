const router = require("express").Router();
const Proposal = require("../models/Proposal");

router.post("", async(req, res, next) => {
    try {
        const proposal = {
            organiser: {
                username: req.body.organiser.username,
                email: req.body.organiser.email,
                phone: req.body.organiser.phone,
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

module.exports = router;