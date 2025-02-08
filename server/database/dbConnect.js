import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      name: "Lms-system",
    });
    console.log("Mongodb Connected Successfully");
  } catch (error) {
    console.log(`Error in Date Base file : ${error}`);
  }
};

export default connectDB;
