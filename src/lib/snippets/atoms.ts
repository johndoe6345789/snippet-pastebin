/**
 * Atoms - Basic UI building blocks code snippets
 */

export const atomsCodeSnippets = {
  buttonDefault: `interface ButtonProps {
  children?: string
  onClick?: () => void
}

function DefaultButton({ children = "Default", onClick }: ButtonProps) {
  return <Button onClick={onClick}>{children}</Button>
}`,
  buttonSecondary: `interface ButtonProps {
  children?: string
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  onClick?: () => void
}

function CustomButton({ children = "Secondary", variant = "secondary", onClick }: ButtonProps) {
  return <Button variant={variant} onClick={onClick}>{children}</Button>
}`,
  buttonDestructive: `interface DestructiveButtonProps {
  children?: string
  onClick?: () => void
}

function DestructiveButton({ children = "Destructive", onClick }: DestructiveButtonProps) {
  return <Button variant="destructive" onClick={onClick}>{children}</Button>
}`,
  buttonOutline: `interface OutlineButtonProps {
  children?: string
  onClick?: () => void
}

function OutlineButton({ children = "Outline", onClick }: OutlineButtonProps) {
  return <Button variant="outline" onClick={onClick}>{children}</Button>
}`,
  buttonGhost: `interface GhostButtonProps {
  children?: string
  onClick?: () => void
}

function GhostButton({ children = "Ghost", onClick }: GhostButtonProps) {
  return <Button variant="ghost" onClick={onClick}>{children}</Button>
}`,
  buttonLink: `interface LinkButtonProps {
  children?: string
  onClick?: () => void
}

function LinkButton({ children = "Link", onClick }: LinkButtonProps) {
  return <Button variant="link" onClick={onClick}>{children}</Button>
}`,
  buttonSizes: `interface ButtonSizesProps {
  smallText?: string
  defaultText?: string
  largeText?: string
  onSmallClick?: () => void
  onDefaultClick?: () => void
  onLargeClick?: () => void
  onIconClick?: () => void
}

function ButtonSizes({ 
  smallText = "Small", 
  defaultText = "Default", 
  largeText = "Large",
  onSmallClick,
  onDefaultClick,
  onLargeClick,
  onIconClick
}: ButtonSizesProps) {
  return (
    <>
      <Button size="sm" onClick={onSmallClick}>{smallText}</Button>
      <Button size="default" onClick={onDefaultClick}>{defaultText}</Button>
      <Button size="lg" onClick={onLargeClick}>{largeText}</Button>
      <Button size="icon" onClick={onIconClick}>
        <Heart weight="fill" />
      </Button>
    </>
  )
}`,
  buttonWithIcons: `interface IconButtonProps {
  primaryText?: string
  secondaryText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

function IconButtons({ 
  primaryText = "Favorite", 
  secondaryText = "Add Item",
  onPrimaryClick,
  onSecondaryClick
}: IconButtonProps) {
  return (
    <>
      <Button onClick={onPrimaryClick}>
        <Star weight="fill" />
        {primaryText}
      </Button>
      <Button variant="outline" onClick={onSecondaryClick}>
        <Plus weight="bold" />
        {secondaryText}
      </Button>
    </>
  )
}`,
  badgeVariants: `interface BadgeVariantsProps {
  defaultText?: string
  secondaryText?: string
  destructiveText?: string
  outlineText?: string
}

function BadgeVariants({ 
  defaultText = "Default",
  secondaryText = "Secondary",
  destructiveText = "Destructive",
  outlineText = "Outline"
}: BadgeVariantsProps) {
  return (
    <>
      <Badge>{defaultText}</Badge>
      <Badge variant="secondary">{secondaryText}</Badge>
      <Badge variant="destructive">{destructiveText}</Badge>
      <Badge variant="outline">{outlineText}</Badge>
    </>
  )
}`,
  badgeWithIcons: `interface IconBadgeProps {
  completedText?: string
  failedText?: string
}

function IconBadges({ 
  completedText = "Completed",
  failedText = "Failed"
}: IconBadgeProps) {
  return (
    <>
      <Badge>
        <Check weight="bold" className="mr-1" />
        {completedText}
      </Badge>
      <Badge variant="destructive">
        <X weight="bold" className="mr-1" />
        {failedText}
      </Badge>
    </>
  )
}`,
  inputBasic: `interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function BasicInput({ placeholder = "Default input", value, onChange }: InputProps) {
  return <Input placeholder={placeholder} value={value} onChange={onChange} />
}`,
  inputWithIcon: `interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchInput({ placeholder = "Search...", value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input placeholder={placeholder} className="pl-10" value={value} onChange={onChange} />
    </div>
  )
}`,
  inputTypes: `interface TypedInputsProps {
  textPlaceholder?: string
  emailPlaceholder?: string
  passwordPlaceholder?: string
  numberPlaceholder?: string
  onTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNumberChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function TypedInputs({ 
  textPlaceholder = "Text input",
  emailPlaceholder = "email@example.com",
  passwordPlaceholder = "Password",
  numberPlaceholder = "123",
  onTextChange,
  onEmailChange,
  onPasswordChange,
  onNumberChange
}: TypedInputsProps) {
  return (
    <>
      <Input type="text" placeholder={textPlaceholder} onChange={onTextChange} />
      <Input type="email" placeholder={emailPlaceholder} onChange={onEmailChange} />
      <Input type="password" placeholder={passwordPlaceholder} onChange={onPasswordChange} />
      <Input type="number" placeholder={numberPlaceholder} onChange={onNumberChange} />
    </>
  )
}`,
}

