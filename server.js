const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3030;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewURLParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose connected");
});

connection.on("error", (err) => {
    console.log("ERROR connecting mongoose");
});

app.get("/api/config", (req, res) => {
    res.json({ success: "Workout homework connected" });
});

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});