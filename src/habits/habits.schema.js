import mongoose from "mongoose";

const HabitSchema = mongoose.Schema({
  name: String,
  createdAt: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  dailyRecords: [
    {
      date: Date,
      status: {
        type: String,
        enum: ["DONE", "NOT DONE", "NONE"],
        default: "NONE",
      },
    },
  ],
  currentStreak: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  totalDaysDone: { type: Number, default: 0 },
  daysCount: { type: Number, default: 1 },
});

// The pre middleware, sorts the daily record array before saving the model
HabitSchema.pre("save", function (next) {
  if (this.dailyRecords) {
    this.dailyRecords.sort((a, b) => a.date - b.date);
  }
  next();
});

// On updating status for any date, the streak is updated.
HabitSchema.pre("save", async function () {
  // Finds the best streak
  let streakCount = 0;
  let maxStreak = 0;
  let totalDaysDone = 0;
  for (let i = 0; i < this.dailyRecords.length; i++) {
    if (this.dailyRecords[i].status === "DONE") {
      streakCount++;
      totalDaysDone++;
    } else {
      streakCount = 0;
    }
    maxStreak = Math.max(maxStreak, streakCount);
  }
  this.bestStreak = maxStreak;
  this.currentStreak = streakCount;

  this.totalDaysDone = totalDaysDone;

  const currentDate = new Date();
  this.daysCount = currentDate.getDate() - this.createdAt.getDate() + 1;
});

const HabitModel = mongoose.model("habit", HabitSchema);
export default HabitModel;
