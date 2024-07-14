import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import app from "./app";

const result_config = dotenv.config({
  path: path.resolve(__dirname, "./config.env"),
});

if (result_config.error) {
  console.error("Error:", result_config.error.message);
  process.exit(1);
}

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoBD connection successful");
  })
  .catch((err: any) => {
    console.error("Failed to connect with MongoDB: ", err);
    process.exit(1);
  });

const port = process.env.PORT;

if (!port) {
  console.error("Error: PORT is not defined in the .env file.");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`App running on port ${port}: http://localhost:${port}/`);
});
