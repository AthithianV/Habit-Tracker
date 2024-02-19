import dotenv from "dotenv";
dotenv.config();

// Import from packages
import express, { json } from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";

// Internal imports
import connectToDB from "./src/config/connectToMongoDB.js";
import { ErrorHandler } from "./src/middlewares/errorHandler.js";
import HabitRouter from "./src/habits/habits.routes.js";
const server = express();

// Middleware for parser req body in post request
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Middleware for handling ejs views
server.use(ejsLayouts);
server.set("view engine", "ejs");
server.set("views", path.resolve("src", "views"));

// Middleware for landing page
server.get("/", (req, res, next) => {
  res.render("landingPage", { msg: null });
});

// Redirect habits path to HabitRouter
server.use("/habits/", HabitRouter);

// Handle for invalid url
server.use((req, res) => {
  res.render("ErrorPage", { msg: "PAGE NOT FOUND" });
});

// Handle for error
server.use(ErrorHandler);

// Server is running on port 3000
server.listen(3000, () => {
  console.log("Server Listening at 3000");
  connectToDB();
});
