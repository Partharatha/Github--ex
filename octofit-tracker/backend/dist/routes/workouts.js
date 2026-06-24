"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await Workout_1.Workout.find({});
    res.json(workouts);
});
router.post('/', async (req, res) => {
    const workout = await Workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
