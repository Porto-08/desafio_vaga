import mongoose from "mongoose";
import { IUser } from "../../../domain/models/IUser";

const UserSchema = new mongoose.Schema({
  name: String,
  document: String,
});

export const User = mongoose.model<IUser & mongoose.Document>("users", UserSchema);
