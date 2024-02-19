import HabitModel from "./habits.schema.js";

// Get all the habits from database
export const getHabitsRepo = async () => {
  try {
    const habits = await HabitModel.find();
    return habits;
  } catch (error) {
    throw error;
  }
};

// Add new Habit to database
export const addHabitRepo = async (data) => {
  try {
    const habit = new HabitModel(data);
    await habit.save();
  } catch (error) {
    throw error;
  }
};

// Mark habit whether it is DONE or NOT DONE
export const markHabitRepo = async (id, status, date) => {
  try {
    const habit = await HabitModel.findById(id);

    const currentDate = new Date(date);
    const dateIndex = habit.dailyRecords.findIndex(
      (record) =>
        record.date.getDate() == currentDate.getDate() &&
        record.date.getMonth() == currentDate.getMonth() &&
        record.date.getYear() == currentDate.getYear()
    );

    if (dateIndex != -1) {
      habit.dailyRecords[dateIndex].status = status;
    } else {
      habit.dailyRecords.push({ date: currentDate, status: status });
    }

    await habit.save();
  } catch (error) {
    throw error;
  }
};

// Deletes the habit
export const deleteHabitRepo = async (id) => {
  try {
    const habit = await HabitModel.deleteOne({ _id: id });
  } catch (error) {
    throw error;
  }
};
