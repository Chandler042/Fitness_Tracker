const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now,
        },
        exercises: [
            {
                type: { type: String },
                name: String,
                duration: Number,
                weight: Number,
                reps: Number,
                sets: Number,
                distance: Number,
            },
        ],
    },
    {
        toJSON: { virtuals: true },
    }
);

WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;