import express from "express";
import { runSPO } from "../services/spo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { task, prompt } = req.body;

    if (!task || !prompt) {
      return res.status(400).json({
        error: "Task and prompt are required"
      });
    }

    const result = await runSPO(task, prompt);
    res.json(result);
  } catch (err) {
    console.error("OPTIMIZE ERROR:", err);
    res.status(500).json({
      error: "Prompt optimization failed"
    });
  }
});

export default router;
