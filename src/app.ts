import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello FriendHub"));

// app.use("/api/v1/reservations", reservationsRouter);

export default app;