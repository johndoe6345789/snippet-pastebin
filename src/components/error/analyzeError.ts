export async function analyzeErrorWithAI(
  errorMessage: string,
  errorStack?: string,
  context?: string
): Promise<string> {
  const contextInfo = context ? `\n\nContext: ${context}` : ''
  const stackInfo = errorStack ? `\n\nStack trace: ${errorStack}` : ''
  
  const prompt = (window.spark.llmPrompt as any)`You are a helpful debugging assistant for a code snippet manager app. Analyze this error and provide:

1. A clear explanation of what went wrong (in plain language)
2. Why this error likely occurred
3. 2-3 specific actionable steps to fix it

Error message: ${errorMessage}${contextInfo}${stackInfo}

Keep your response concise, friendly, and focused on practical solutions. Format your response with clear sections using markdown.`

  const result = await window.spark.llm(prompt, 'gpt-4o-mini')
  return result
}
