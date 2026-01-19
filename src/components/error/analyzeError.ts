export async function analyzeErrorWithAI(
  errorMessage: string,
  errorStack?: string,
  context?: string
): Promise<string> {
  // Simple error analysis without AI - just return helpful debugging info
  const lines = ['## Error Analysis\n'];
  
  lines.push('**Error Message:**');
  lines.push(`\`${errorMessage}\`\n`);
  
  if (context) {
    lines.push('**Context:**');
    lines.push(`${context}\n`);
  }
  
  if (errorStack) {
    lines.push('**Possible Solutions:**');
    lines.push('1. Check the browser console for more details');
    lines.push('2. Try refreshing the page');
    lines.push('3. Clear your browser cache and local storage\n');
  }
  
  return lines.join('\n');
}
