import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  date: string;
  user: mongoose.Types.ObjectId;
  calories: number;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  calories: { type: Number, required: true },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
