// import mongoose from "mongoose";

// export const connectDB = async () => {

//     await mongoose.connect()
// }

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Replace 'my database' with whatever you want to name your DB
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense-tracker",
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the app if the connection fails
  }
};
