import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import type { Monaco } from '@monaco-editor/react'

const Editor = lazy(() => import('@monaco-editor/react'))

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  readOnly?: boolean
}

function EditorLoadingSkeleton({ height = '400px' }: { height?: string }) {
  return (
    <div className="space-y-2" style={{ height }}>
      <Skeleton className="h-full w-full rounded-md" />
    </div>
  )
}

function handleEditorBeforeMount(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  })

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  })

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  const reactTypes = `
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

  const shadcnTypes = `
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

  monaco.languages.typescript.typescriptDefaults.addExtraLib(reactTypes, 'file:///node_modules/@types/react/index.d.ts')
  monaco.languages.typescript.javascriptDefaults.addExtraLib(reactTypes, 'file:///node_modules/@types/react/index.d.ts')
  monaco.languages.typescript.typescriptDefaults.addExtraLib(shadcnTypes, 'file:///node_modules/@types/shadcn/index.d.ts')
  monaco.languages.typescript.javascriptDefaults.addExtraLib(shadcnTypes, 'file:///node_modules/@types/shadcn/index.d.ts')
}

export function MonacoEditor({ 
  value, 
  onChange, 
  language, 
  height = '400px',
  readOnly = false 
}: MonacoEditorProps) {
  const monacoLanguage = getMonacoLanguage(language)
  
  return (
    <Suspense fallback={<EditorLoadingSkeleton height={height} />}>
      <Editor
        height={height}
        language={monacoLanguage}
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
        theme="vs-dark"
        beforeMount={handleEditorBeforeMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          readOnly,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            useShadows: false,
          },
          padding: {
            top: 12,
            bottom: 12,
          },
          fontFamily: 'JetBrains Mono, monospace',
          fontLigatures: true,
        }}
      />
    </Suspense>
  )
}

function getMonacoLanguage(language: string): string {
  const languageMap: Record<string, string> = {
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
  
  return languageMap[language] || 'plaintext'
}
