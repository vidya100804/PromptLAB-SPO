import { runSPO } from "../backend/services/spo.js";
import { callLLM } from "../backend/services/openrouter.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { task, prompt } = req.body;
    const result = await runSPO(task, prompt, callLLM);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
