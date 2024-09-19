import mongoose from "mongoose";

export class Database {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database', error);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}