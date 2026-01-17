/**
 * Monaco Editor TypeScript/React type definitions and compiler options
 * These definitions are loaded into Monaco to provide IntelliSense for React and shadcn components
 */

import type { Monaco } from '@monaco-editor/react'

/**
 * TypeScript compiler options for both TypeScript and JavaScript files
 */
export const compilerOptions = {
  target: 2, // ScriptTarget.Latest
  allowNonTsExtensions: true,
  moduleResolution: 2, // ModuleResolutionKind.NodeJs
  module: 99, // ModuleKind.ESNext
  noEmit: true,
  esModuleInterop: true,
  jsx: 2, // JsxEmit.React
  reactNamespace: 'React',
  allowJs: true,
  typeRoots: ['node_modules/@types'],
}

/**
 * Diagnostics options for TypeScript/JavaScript validation
 */
export const diagnosticsOptions = {
  noSemanticValidation: false,
  noSyntaxValidation: false,
}

/**
 * React type definitions for Monaco IntelliSense
 */
export const reactTypes = `
  declare module 'react' {
    export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
    export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
    export function useMemo<T>(factory: () => T, deps: any[]): T;
    export function useRef<T>(initialValue: T): { current: T };
    export function useContext<T>(context: React.Context<T>): T;
    export function useReducer<S, A>(reducer: (state: S, action: A) => S, initialState: S): [S, (action: A) => void];
    export interface Context<T> { Provider: any; Consumer: any; }
    export function createContext<T>(defaultValue: T): Context<T>;
    export type FC<P = {}> = (props: P) => JSX.Element | null;
    export type ReactNode = JSX.Element | string | number | boolean | null | undefined;
    export interface CSSProperties { [key: string]: any; }
  }

  declare namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
`

/**
 * shadcn/ui component type definitions for Monaco IntelliSense
 */
export const shadcnTypes = `
  declare module '@/components/ui/button' {
    export interface ButtonProps {
      variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
      size?: 'default' | 'sm' | 'lg' | 'icon';
      asChild?: boolean;
      className?: string;
      children?: React.ReactNode;
      onClick?: () => void;
      type?: 'button' | 'submit' | 'reset';
    }
    export function Button(props: ButtonProps): JSX.Element;
  }

  declare module '@/components/ui/card' {
    export interface CardProps {
      className?: string;
      children?: React.ReactNode;
    }
    export function Card(props: CardProps): JSX.Element;
    export function CardHeader(props: CardProps): JSX.Element;
    export function CardTitle(props: CardProps): JSX.Element;
    export function CardDescription(props: CardProps): JSX.Element;
    export function CardContent(props: CardProps): JSX.Element;
    export function CardFooter(props: CardProps): JSX.Element;
  }

  declare module '@/components/ui/input' {
    export interface InputProps {
      type?: string;
      placeholder?: string;
      value?: string;
      onChange?: (e: any) => void;
      className?: string;
    }
    export function Input(props: InputProps): JSX.Element;
  }

  declare module '@/components/ui/badge' {
    export interface BadgeProps {
      variant?: 'default' | 'secondary' | 'destructive' | 'outline';
      className?: string;
      children?: React.ReactNode;
    }
    export function Badge(props: BadgeProps): JSX.Element;
  }

  declare module '@/components/ui/checkbox' {
    export interface CheckboxProps {
      checked?: boolean;
      onCheckedChange?: (checked: boolean) => void;
      className?: string;
    }
    export function Checkbox(props: CheckboxProps): JSX.Element;
  }

  declare module '@/components/ui/switch' {
    export interface SwitchProps {
      checked?: boolean;
      onCheckedChange?: (checked: boolean) => void;
      className?: string;
    }
    export function Switch(props: SwitchProps): JSX.Element;
  }

  declare module '@/lib/utils' {
    export function cn(...inputs: any[]): string;
  }

  declare module '@phosphor-icons/react' {
    export interface IconProps {
      size?: number;
      weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
      color?: string;
      className?: string;
    }
    export function Plus(props: IconProps): JSX.Element;
    export function Minus(props: IconProps): JSX.Element;
    export function Check(props: IconProps): JSX.Element;
    export function X(props: IconProps): JSX.Element;
    export function Trash(props: IconProps): JSX.Element;
    export function PencilSimple(props: IconProps): JSX.Element;
    export function MagnifyingGlass(props: IconProps): JSX.Element;
    export function Heart(props: IconProps): JSX.Element;
    export function Star(props: IconProps): JSX.Element;
    export function User(props: IconProps): JSX.Element;
    export function ShoppingCart(props: IconProps): JSX.Element;
    [key: string]: (props: IconProps) => JSX.Element;
  }
`

/**
 * Configures Monaco editor with TypeScript/React support
 */
export function configureMonacoTypeScript(monaco: Monaco) {
  // Set compiler options for TypeScript
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions as any)
  
  // Set compiler options for JavaScript
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions as any)

  // Set diagnostics options for TypeScript
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptions)
  
  // Set diagnostics options for JavaScript
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(diagnosticsOptions)

  // Add React type definitions
  monaco.languages.typescript.typescriptDefaults.addExtraLib(reactTypes, 'file:///node_modules/@types/react/index.d.ts')
  monaco.languages.typescript.javascriptDefaults.addExtraLib(reactTypes, 'file:///node_modules/@types/react/index.d.ts')
  
  // Add shadcn component type definitions
  monaco.languages.typescript.typescriptDefaults.addExtraLib(shadcnTypes, 'file:///node_modules/@types/shadcn/index.d.ts')
  monaco.languages.typescript.javascriptDefaults.addExtraLib(shadcnTypes, 'file:///node_modules/@types/shadcn/index.d.ts')
}

/**
 * Language mapping for Monaco editor
 */
export const languageMap: Record<string, string> = {
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'JSX': 'javascript',
  'TSX': 'typescript',
  'Python': 'python',
  'Java': 'java',
  'C++': 'cpp',
  'C#': 'csharp',
  'Ruby': 'ruby',
  'Go': 'go',
  'Rust': 'rust',
  'PHP': 'php',
  'Swift': 'swift',
  'Kotlin': 'kotlin',
  'HTML': 'html',
  'CSS': 'css',
  'SQL': 'sql',
  'Bash': 'shell',
  'Other': 'plaintext',
}

/**
 * Converts a high-level language name to Monaco language ID
 */
export function getMonacoLanguage(language: string): string {
  return languageMap[language] || 'plaintext'
}
