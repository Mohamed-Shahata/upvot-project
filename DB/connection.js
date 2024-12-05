import mongoose from "mongoose";

const db_connection = async () => {
  return await mongoose
    .connect(process.env.CONNECTION_URL_LOCAL)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log("faild to connect to DB", err));
};
export default db_connection;