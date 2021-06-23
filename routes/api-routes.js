const db = require("../models");

module.exports = function (app) {
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
        .then((foundWorkouts) => {
            res.json(foundWorkouts);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                error: true,
                data: null,
                message: "Failed to retrieve workouts.",
            });
        });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
          .then((newWorkout) => {
            res.json(newWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
    });
    
    app.put("/api/workouts/:id", function (req, res) {
        db.Workout.findByIdAndUpdate(
          req.params.id,
          { $push: { exercises: req.body } },
          { new: true }
        )
        .then((workout) => {
            // workout.exercises.push(req.body);
            res.json(workout);
        })
        .catch((err) => {
            console.log(err);
            res.json({
              error: true,
              data: null,
              message: "Failed to update workout.",
            });
        });
    });
    
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .limit(7)
        .then((foundWorkout) => {
            res.json(foundWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
    });
};