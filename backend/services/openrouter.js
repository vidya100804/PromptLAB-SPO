import fetch from "node-fetch";

export async function callLLM({ system, user }) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        system && { role: "system", content: system },
        { role: "user", content: user }
      ].filter(Boolean),
      temperature: 0.4
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${text}`);
  }

  const data = await res.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("Invalid OpenRouter response structure");
  }

  return data.choices[0].message.content.trim();
}
