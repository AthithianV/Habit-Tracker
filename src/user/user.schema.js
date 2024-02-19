import mongoose from "mongoose";

// User Schema with name and all habits of use.
const UserSchema = mongoose.Schema({
  name: String,
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "habit" }],
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
