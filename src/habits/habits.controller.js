import currentWeekStatus from "../util/weekReportGenerator.js";
import {
  addHabitRepo,
  deleteHabitRepo,
  getHabitsRepo,
  markHabitRepo,
} from "./habits.repository.js";

// Emojis array
const emojis = {
  exercise: "❤️",
  jogging: "🏃‍♂️",
  walking: "🏃‍♂️",
  yoga: "🧘‍♂️",
  meditate: "🧘‍♂️",
  swimming: "🏊‍♀️",
  cycling: "🚴‍♂️",
  reading: "📘",
  read: "📘",
  music: "🎧",
  workout: "💪",
};

// Get array
export const getHabits = async (req, res, next) => {
  try {
    const habits = await getHabitsRepo();

    if (!habits || habits.length == 0) {
      return res.render("landingPage", {
        msg: "No habits availabe",
      });
    }
    return res.render("dailyView", {
      habits,
      emojis,
    });
  } catch (error) {
    throw error;
  }
};

// Render the weekview page as res
export const showWeeklyView = async (req, res, next) => {
  try {
    const habits = await getHabitsRepo();

    if (!habits || habits.length == 0) {
      return res.render("landingPage", {
        msg: "No habits availabe",
      });
    }

    const habitReport = habits.map((habit) => {
      return {
        id: habit._id,
        name: habit.name,
        weekReport: currentWeekStatus(habit),
      };
    });

    return res.render("weeklyView", {
      habitReport,
      emojis,
    });
  } catch (error) {
    throw error;
  }
};

// Create new habit
export const addHabit = async (req, res, next) => {
  try {
    const { habitname } = req.body;
    await addHabitRepo({
      name: habitname,
      createdAt: new Date(),
    });
    const habits = await getHabitsRepo();

    return res.render("dailyView", {
      habits,
      emojis,
    });
  } catch (error) {
    throw error;
  }
};

// Mark habit with help of the status
export const markHabit = async (req, res, next) => {
  try {
    const { id, status, date } = req.body;
    await markHabitRepo(id, status, date);
    res.status(200).send({ msg: "success" });
  } catch (error) {
    throw error;
  }
};

// Delete a habit
export const deleteHabit = async (req, res, next) => {
  try {
    await deleteHabitRepo(req.params.id);
    const habits = await getHabitsRepo();

    return res.render("dailyView", {
      habits,
      emojis,
    });
  } catch (error) {
    throw error;
  }
};
