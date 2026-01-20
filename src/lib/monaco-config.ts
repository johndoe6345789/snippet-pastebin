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
