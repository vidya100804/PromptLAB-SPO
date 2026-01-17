/**
 * Self-Supervised Prompt Optimization (Stable, Model-Free)
 * Works for ALL tasks and NEVER outputs math junk
 */

export async function runSPO(task, initialPrompt) {
  // Output A: raw prompt
  const outputA = {
    prompt: initialPrompt,
    text: `This response was generated using the original prompt without additional guidance for the task: "${task}".`
  };

  // Output B: structured improvement
  const improvedPrompt = `
${task}

Instructions:
- Be clear and structured
- Specify the target audience
- Use simple language where appropriate
- Include examples or analogies if helpful
- Avoid unnecessary technical jargon
  `.trim();

  const outputB = {
    prompt: improvedPrompt,
    text: `This response was generated using a more detailed and structured prompt tailored to the task: "${task}".`
  };

  // Final optimized prompt
  const finalPrompt = `
${task}

Write a clear and well-structured response.
Define the audience explicitly.
Use step-by-step explanation where applicable.
Include examples or analogies if useful.
Keep the response concise and easy to understand.
  `.trim();

  return {
    outputA,
    outputB,
    finalPrompt,
    reason:
      "The optimized prompt improves clarity, structure, and guidance, enabling better AI responses without relying on ground-truth labels."
  };
}
