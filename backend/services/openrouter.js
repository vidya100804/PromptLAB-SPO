import fetch from "node-fetch";

export async function callOpenRouter(prompt) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct"
,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
