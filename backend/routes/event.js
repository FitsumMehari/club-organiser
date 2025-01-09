const router = require("express").Router();
const Event = require("../models/Event");
const { verifyToken } = require("./verifyToken")

// Update A CLub By Club ID When A Request To Be A Member is Accepted By The Club Managers
router.post("/reserve/:eventID", async(req, res, next) => {
    if (req.params.eventID) {
        try {
            const event = await Event.findById(req.params.eventID);

            const existingRequest = event.attendees.find(member => member.email === req.body.email);
            if (existingRequest) {
                return res.status(200).json({ message: 'Reservation request already exists' });
            }

            event.attendees.push({ name: req.body.name, email: req.body.email, status: "pending" });
            await event.save();

            res.status(201).json({ message: 'Reservation request submitted successfully' });

        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: "Invalid club ID!" });
    }
});

// Get All Events
router.get("/", async(req, res, next) => {
    try {
        const allEvents = await Event.find({});
        res.status(200).json(allEvents);
    } catch (error) {
        next(error);
    }
});

// Get Single event By ID Of event
router.get("/:eventID", async(req, res, next) => {
    if (!req.params.eventID) {
        res.status(400).json({ message: "Invalid event ID!" });
    } else {
        try {
            const existingEvent = await Event.findById(req.params.eventID)
            res.status(200).json(existingEvent);
        } catch (error) {
            next(error);
        }
    }
});

// Update A CLub By Club ID
router.put("/:eventID", verifyToken, async(req, res, next) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventID, {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            managers: req.body.managers,
            members: req.body.members,
            status: req.body.status,
            logo: req.body.logo,
            location: req.body.location,
        });

        const newValues = await Event.findOne(req.body.id);

        res.status(200).json({
            message: "Update Successful!",
            newValues,
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;