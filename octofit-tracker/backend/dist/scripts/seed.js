"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.insertMany([
        {
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            password: 'password123',
            role: 'admin',
        },
        {
            name: 'Grace Hopper',
            email: 'grace@example.com',
            password: 'password123',
            role: 'member',
        },
        {
            name: 'Katherine Johnson',
            email: 'katherine@example.com',
            password: 'password123',
            role: 'coach',
        },
    ]);
    const team = await Team_1.Team.create({
        name: 'Momentum Squad',
        sport: 'CrossFit',
        members: users.slice(0, 2).map((user) => user._id),
        captain: users[0]._id,
    });
    await Activity_1.Activity.insertMany([
        {
            type: 'Run',
            durationMinutes: 32,
            date: '2026-06-20',
            user: users[0]._id,
            calories: 410,
        },
        {
            type: 'Cycling',
            durationMinutes: 45,
            date: '2026-06-21',
            user: users[1]._id,
            calories: 520,
        },
        {
            type: 'Yoga',
            durationMinutes: 25,
            date: '2026-06-22',
            user: users[2]._id,
            calories: 180,
        },
    ]);
    await Leaderboard_1.Leaderboard.insertMany([
        {
            user: users[0]._id,
            points: 1240,
            rank: 1,
        },
        {
            user: users[1]._id,
            points: 1100,
            rank: 2,
        },
        {
            user: users[2]._id,
            points: 980,
            rank: 3,
        },
    ]);
    await Workout_1.Workout.insertMany([
        {
            title: 'Strength Circuit',
            difficulty: 'Intermediate',
            durationMinutes: 40,
            focus: 'Full Body',
        },
        {
            title: 'HIIT Cardio',
            difficulty: 'Advanced',
            durationMinutes: 25,
            focus: 'Endurance',
        },
        {
            title: 'Mobility Flow',
            difficulty: 'Beginner',
            durationMinutes: 20,
            focus: 'Recovery',
        },
    ]);
    console.log(`Seed complete. Created ${users.length} users and 1 team.`);
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
