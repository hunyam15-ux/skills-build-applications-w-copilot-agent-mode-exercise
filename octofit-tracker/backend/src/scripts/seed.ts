import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
    );

    console.log('Connected to octofit_db');

    const teamData = [
      { name: 'Summit Striders', points: 2850 },
      { name: 'Harbor Pacers', points: 2410 },
    ];
    const teams = await Promise.all(
      teamData.map(({ name, ...data }) =>
        Team.findOneAndUpdate(
          { name },
          { $set: { name, ...data } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        ),
      ),
    );
    const teamByName = new Map(teams.map((team) => [team.name, team]));

    const userData = [
      {
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        name: 'Maya Chen',
        team: 'Summit Striders',
      },
      {
        username: 'liam.johnson',
        email: 'liam.johnson@example.com',
        name: 'Liam Johnson',
        team: 'Summit Striders',
      },
      {
        username: 'sofia.rivera',
        email: 'sofia.rivera@example.com',
        name: 'Sofia Rivera',
        team: 'Harbor Pacers',
      },
      {
        username: 'noah.patel',
        email: 'noah.patel@example.com',
        name: 'Noah Patel',
        team: 'Harbor Pacers',
      },
    ];
    const users = await Promise.all(
      userData.map(({ team, ...data }) =>
        User.findOneAndUpdate(
          { username: data.username },
          { $set: { ...data, team: teamByName.get(team)!._id } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        ),
      ),
    );
    const userByUsername = new Map(users.map((user) => [user.username, user]));

    await Promise.all(
      teamData.map(({ name }) => {
        const members = userData
          .filter((user) => user.team === name)
          .map((user) => userByUsername.get(user.username)!._id);

        return Team.updateOne({ name }, { $set: { members } });
      }),
    );

    const activityData = [
      { username: 'maya.chen', type: 'Running', duration: 35, distance: 5.2, calories: 340, date: new Date('2026-11-08T07:30:00Z') },
      { username: 'liam.johnson', type: 'Cycling', duration: 50, distance: 18.4, calories: 510, date: new Date('2026-11-07T08:00:00Z') },
      { username: 'sofia.rivera', type: 'Swimming', duration: 40, distance: 1.5, calories: 390, date: new Date('2026-11-08T09:00:00Z') },
      { username: 'noah.patel', type: 'Running', duration: 28, distance: 4.1, calories: 295, date: new Date('2026-11-06T06:45:00Z') },
      { username: 'maya.chen', type: 'Strength Training', duration: 45, calories: 280, date: new Date('2026-11-05T17:00:00Z') },
    ];
    await Promise.all(
      activityData.map(({ username, ...data }) => {
        const user = userByUsername.get(username)!;
        const activity = { ...data, user: user._id };

        return Activity.findOneAndUpdate(
          { user: user._id, type: data.type, date: data.date },
          { $set: activity },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
      }),
    );

    const leaderboardData = [
      { username: 'maya.chen', points: 1420, rank: 1 },
      { username: 'sofia.rivera', points: 1280, rank: 2 },
      { username: 'liam.johnson', points: 1190, rank: 3 },
      { username: 'noah.patel', points: 980, rank: 4 },
    ];
    await Promise.all(
      leaderboardData.map(({ username, points, rank }) => {
        const user = userByUsername.get(username)!;
        return Leaderboard.findOneAndUpdate(
          { user: user._id },
          { $set: { user: user._id, points, rank } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
      }),
    );
    await Promise.all(
      [
        { name: 'Summit Striders', points: 2610, rank: 1 },
        { name: 'Harbor Pacers', points: 2260, rank: 2 },
      ].map(({ name, points, rank }) => {
        const team = teamByName.get(name)!;
        return Leaderboard.findOneAndUpdate(
          { team: team._id },
          { $set: { team: team._id, points, rank } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
      }),
    );

    const workoutData = [
      { name: 'Easy Morning Run', description: 'A relaxed run to build an aerobic base.', activityType: 'Running', duration: 30, difficulty: 'beginner' },
      { name: 'Tempo Run', description: 'A steady effort to improve running endurance.', activityType: 'Running', duration: 40, difficulty: 'intermediate' },
      { name: 'Recovery Ride', description: 'A low-intensity ride for active recovery.', activityType: 'Cycling', duration: 45, difficulty: 'beginner' },
      { name: 'Full Body Strength', description: 'A balanced strength session for the whole body.', activityType: 'Strength Training', duration: 35, difficulty: 'intermediate' },
    ] as const;
    await Promise.all(
      workoutData.map(({ name, ...data }) =>
        Workout.findOneAndUpdate(
          { name },
          { $set: { name, ...data } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
