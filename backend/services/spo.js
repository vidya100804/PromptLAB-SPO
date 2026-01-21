export async function runSPO(task, initialPrompt, callLLM) {
  const basePrompt =
    initialPrompt.trim().split(/\s+/).length <= 2
      ? task.trim()
      : initialPrompt.trim();

  let bestPrompt = basePrompt;
  let wins = 0;

  const AXES = [
    "clarity",
    "structure",
    "brevity",
    "audience"
  ];

  for (const axis of AXES) {

    // 1️⃣ Axis-specific mutation
    const candidatePrompt = (await callLLM({
      system: `
You are rewriting a PROMPT for an AI.

Optimization axis: ${axis}

Rules:
- Do NOT answer the task
- Do NOT include explanations or examples
- Write instructions only
- Keep the same task intent
- Modify the prompt ONLY to improve ${axis}
- Max 25 words

Return ONLY the rewritten prompt.
`,
      user: `
Task:
${task}

Current prompt:
${bestPrompt}

Rewritten prompt:
`
    }))?.trim();

    // 2️⃣ Hard rejection
    if (
      !candidatePrompt ||
      candidatePrompt === bestPrompt ||
      candidatePrompt.split(/\s+/).length > 25 ||
      /(:|\n|\d+\.|example|step|code)/i.test(candidatePrompt)
    ) {
      continue;
    }

    // 3️⃣ Output comparison
    const [outA, outB] = await Promise.all([
      callLLM({ user: `${task}\n\n${bestPrompt}` }),
      callLLM({ user: `${task}\n\n${candidatePrompt}` })
    ]);

    const judge = await callLLM({
      system: `
You are judging ANSWERS.

Choose the answer that better satisfies the task.
Reply ONLY with A or B.
`,
      user: `
Task:
${task}

Answer A:
${outA}

Answer B:
${outB}

Which is better?
`
    });

    if (judge.trim().startsWith("B")) {
      bestPrompt = candidatePrompt;
      wins++;
    }
  }

  return {
    outputA: {
      prompt: initialPrompt,
      text: "Generated using the original prompt."
    },
    outputB: {
      prompt: bestPrompt,
      text: "Generated using the optimized prompt."
    },
    finalPrompt: bestPrompt,
    confidenceScore: Math.round((wins / AXES.length) * 100),
    reason:
      wins === 0
        ? "The base prompt already satisfied all optimization axes."
        : "The prompt was improved along specific quality dimensions."
  };
}
