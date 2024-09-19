import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI! as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default connect;