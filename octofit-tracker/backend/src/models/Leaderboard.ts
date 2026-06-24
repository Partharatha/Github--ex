import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
