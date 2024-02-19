import express from "express";
import {
  addHabit,
  deleteHabit,
  getHabits,
  markHabit,
  showWeeklyView,
} from "./habits.controller.js";

const HabitRouter = express.Router();

// Get method for rendering daily view
HabitRouter.get("/", getHabits);

// Get method for rendering Weekly view
HabitRouter.get("/weekly_view", showWeeklyView);

// Post method for adding new habit
HabitRouter.post("/", addHabit);

// Post method for marking habit
HabitRouter.post("/markHabit", markHabit);

//Post method for deleting habit
HabitRouter.post("/deleteHabit/:id", deleteHabit);

export default HabitRouter;
