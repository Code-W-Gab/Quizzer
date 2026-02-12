import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Quizzer");
    console.log("MongoDB is Connected");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export default connectDB;