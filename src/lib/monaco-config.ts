/**
 * shadcn/ui component type definitions for Monaco IntelliSense
 */
const shadcnTypes = `
// ...
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
// ...
`;

function configureMonacoTypeScript(monaco: Monaco) {
  // ...
  // Add shadcn component type definitions
  monaco.languages.typescript.typescriptDefaults.addExtraLib(shadcnTypes, 'file:///node_modules/@types/shadcn/index.d.ts');
  monaco.languages.typescript.javascriptDefaults.addExtraLib(shadcnTypes, 'file:///node_modules/@types/shadcn/index.d.ts');
}
