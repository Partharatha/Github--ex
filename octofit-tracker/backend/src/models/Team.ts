import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: Array<mongoose.Types.ObjectId>;
  captain: mongoose.Types.ObjectId;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
