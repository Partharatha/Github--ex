import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  const team = await Team.create({
    name: 'Momentum Squad',
    sport: 'CrossFit',
    members: users.slice(0, 2).map((user) => user._id),
    captain: users[0]._id,
  });

  await Activity.insertMany([
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

  await Leaderboard.insertMany([
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

  await Workout.insertMany([
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
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
