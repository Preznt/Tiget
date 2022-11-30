import mongoose from "mongoose";

const usersModel = mongoose.Schema({
  u_email: String,
  u_password: String,
  u_name: String,
  u_nickname: String,
  u_birthday: String,
  u_role: Number,
});

export default mongoose.model("tbl_users", usersModel);
