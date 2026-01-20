const shadcnTypes = `
// ...
  declare module '@/components/ui/button' {
    export interface ButtonProps {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
      variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
      size?: 'default' | 'sm' | 'lg' | 'icon';
    }
    export function Button(props: ButtonProps): JSX.Element;
  }
// ...
`;
