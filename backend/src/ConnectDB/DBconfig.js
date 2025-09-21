import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_DB_CONNECTION_STR);
    console.log(mongoose.connection.host);
  } catch (err) {
    console.log("Internal error: ", err);
  }
};
