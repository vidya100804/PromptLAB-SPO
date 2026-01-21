import express from "express";
import { runSPO } from "./services/spo.js";
import { callLLM } from "./services/openrouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());



app.get("/", (req, res) => {
  res.send("PromptLab Backend is running");
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});



// backend/server.js
app.post("/optimize", async (req, res) => {
  try {
    const { task, prompt } = req.body;
    const result = await runSPO(task, prompt, callLLM);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
