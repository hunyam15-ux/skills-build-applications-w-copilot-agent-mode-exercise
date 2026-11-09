import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    distance: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    activityType: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const Leaderboard = model('Leaderboard', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);
