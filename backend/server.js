import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizeRoute from "./routes/optimize.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/optimize", optimizeRoute);

app.get("/", (req, res) => {
  res.send("PromptLab Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
