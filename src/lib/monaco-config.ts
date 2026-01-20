import type { Monaco } from '@monaco-editor/react'

const shadcnTypes = `
// ...
  declare module '@/components/ui/button' {
    export interface ButtonProps {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
      variant?: string;
      size?: string;
    }
    export function Button(props: ButtonProps): JSX.Element;
  }
// ...
`;

/**
 * Configure TypeScript support in Monaco Editor
 */
export function configureMonacoTypeScript(monaco: Monaco) {
  // TypeScript is automatically supported by Monaco
  // This function can be used for additional configuration if needed
  if (monaco.languages.typescript) {
    // Configure TypeScript defaults if needed
    monaco.languages.typescript.typescriptDefaults.setEagerModelSyncEnabled(true)
  }
}

/**
 * Map language names to Monaco Editor language IDs
 */
export function getMonacoLanguage(language: string): string {
  const languageMap: Record<string, string> = {
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'JSX': 'javascript',
    'TSX': 'typescript',
    'Python': 'python',
    'Java': 'java',
    'C++': 'cpp',
    'C#': 'csharp',
    'Go': 'go',
    'Rust': 'rust',
    'PHP': 'php',
    'Ruby': 'ruby',
    'SQL': 'sql',
    'HTML': 'html',
    'CSS': 'css',
    'JSON': 'json',
    'YAML': 'yaml',
    'Markdown': 'markdown',
    'XML': 'xml',
    'Shell': 'shell',
    'Bash': 'shell',
  }

  return languageMap[language] || language.toLowerCase()
}
