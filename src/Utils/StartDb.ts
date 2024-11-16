import mongoose from "mongoose";

const StartDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    console.info("Db connected");
  } catch (error) {
    console.error("Failed to connect db " + error);
  }

  mongoose.connection.on("error", (err) => {
    console.error("Db connection failed " + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.info("Db disconnected");
  });
};

export default StartDb;
