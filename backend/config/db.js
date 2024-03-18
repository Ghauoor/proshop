import mongooes from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongooes.connect(process.env.MONGO_URI);
    console.log(`MongoDB connect: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
