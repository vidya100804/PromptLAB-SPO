import { runSPO } from "../backend/services/spo.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { task, prompt } = req.body;

    if (!task || !prompt) {
      return res.status(400).json({ error: "Missing task or prompt" });
    }

    const result = await runSPO(task, prompt);
    return res.status(200).json(result);
  } catch (err) {
    console.error("SPO API ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
