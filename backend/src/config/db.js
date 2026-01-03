import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("thanh cong");
  } catch (error) {
    console.log("loi ket noi:", error);
    process.exit(1);
  }
};
