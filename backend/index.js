const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// app.use(express.static("browser"));

app.use(cors()); // Use the cors middleware with your options

const PORT = process.env.PORT || 3000;
app.use(express.json());

const authRoute = require("./routes/auth");
const clubRoute = require("./routes/club");
const managerRoute = require("./routes/manager");
const eventRoute = require("./routes/event");
const proposalRoute = require("./routes/proposal");

// Database connector code
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected successfully!");
    })
    .catch((error) => {
        console.log(error);
    });

// Auth route path
app.use("/auth", authRoute);
app.use("/clubs", clubRoute);
app.use("/managers", managerRoute);
app.use("/events", eventRoute);
app.use("/proposals", proposalRoute);

//ROUTE NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("Sorry, route could not be located!");
    // res.redirect("/");
});

//ERROR
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});