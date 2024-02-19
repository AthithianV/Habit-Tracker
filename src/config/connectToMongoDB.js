import mongoose from "mongoose";
import UserModel from "../user/user.schema.js";
import HabitModel from "../habits/habits.schema.js";

const password = encodeURIComponent("AQ!SW@de3fr4");
const url = `mongodb+srv://Athithian:${password}@cluster0.jbnemwi.mongodb.net/?retryWrites=true&w=majority&appName=Ecomm_Database`;

const connectToDB = async () => {
  try {
    // Connects to monogDB
    mongoose.connect(url);
    console.log("Connected to MongoDB");
    // Create default user.
    createDefaultUser();
    // createHabits();
  } catch (err) {
    console.log("Something Went wrong While connecting to MongoDB");
  }
};

const createDefaultUser = async () => {
  const found = UserModel.findOne({ name: "Hero" });
  if (!found) {
    const defaultUser = new UserModel({ name: "Hero" });
    await defaultUser.save();
  }
};

const createHabits = async () => {
  const newHabit = new HabitModel({
    name: "Walking",
    time: new Date(),
    user: "65cf9019fa7ac36b616f56c7",
    target: 45,
  });
  await newHabit.save();
};

export default connectToDB;
