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

export const moleculesCodeSnippets = {
  formField: `interface FormFieldProps {
  label?: string
  placeholder?: string
  helperText?: string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function EmailFormField({ 
  label = "Email Address",
  placeholder = "john@example.com",
  helperText = "We'll never share your email with anyone else.",
  id = "email",
  value,
  onChange
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input id={id} type="email" placeholder={placeholder} className="pl-10" value={value} onChange={onChange} />
      </div>
      <p className="text-sm text-muted-foreground">
        {helperText}
      </p>
    </div>
  )
}`,
  searchBar: `interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ placeholder = "Search...", value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input placeholder={placeholder} className="pl-10" value={value} onChange={onChange} />
    </div>
  )
}`,
  searchBarWithButton: `interface SearchBarWithButtonProps {
  placeholder?: string
  buttonText?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: () => void
}

function SearchBarWithButton({ 
  placeholder = "Search...",
  buttonText = "Search",
  value,
  onChange,
  onSearch
}: SearchBarWithButtonProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder={placeholder} className="pl-10" value={value} onChange={onChange} />
      </div>
      <Button onClick={onSearch}>{buttonText}</Button>
    </div>
  )
}`,
  userCard: `interface UserCardProps {
  name?: string
  username?: string
  bio?: string
  avatarUrl?: string
  avatarFallback?: string
  buttonText?: string
  onButtonClick?: () => void
}

function UserCard({ 
  name = "Alex Morgan",
  username = "@alexmorgan",
  bio = "Product designer passionate about creating delightful user experiences.",
  avatarUrl = "https://i.pravatar.cc/150?img=1",
  avatarFallback = "AM",
  buttonText = "Follow",
  onButtonClick
}: UserCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{username}</p>
          <p className="text-sm mt-2">
            {bio}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </Card>
  )
}`,
  socialActions: `interface SocialActionsProps {
  likeText?: string
  commentText?: string
  shareText?: string
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
}

function SocialActions({ 
  likeText = "Like",
  commentText = "Comment",
  shareText = "Share",
  onLike,
  onComment,
  onShare
}: SocialActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onLike}>
        <Heart className="mr-2" />
        {likeText}
      </Button>
      <Button variant="ghost" size="sm" onClick={onComment}>
        <ChatCircle className="mr-2" />
        {commentText}
      </Button>
      <Button variant="ghost" size="sm" onClick={onShare}>
        <Share className="mr-2" />
        {shareText}
      </Button>
    </div>
  )
}`,
  statusIndicator: `interface StatusIndicatorProps {
  statusText?: string
  badgeText?: string
  isActive?: boolean
}

function StatusIndicator({ 
  statusText = "System Online",
  badgeText = "Active",
  isActive = true
}: StatusIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={cn(
          "h-3 w-3 rounded-full bg-accent",
          isActive && "animate-pulse"
        )} />
        <span className="font-medium">{statusText}</span>
      </div>
      <Badge>{badgeText}</Badge>
    </div>
  )
}`,
  contentCard: `interface ContentCardProps {
  title?: string
  description?: string
  date?: string
  readTime?: string
  tags?: string[]
}

function ContentCard({ 
  title = "Building Scalable Design Systems",
  description = "Learn how to create and maintain design systems that grow with your team.",
  date = "Mar 15, 2024",
  readTime = "5 min read",
  tags = ["Design", "System"]
}: ContentCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}`,
}

export const organismsCodeSnippets = {
  navigationBar: `interface NavigationBarProps {
  brandName?: string
  navItems?: Array<{ label: string; icon: React.ReactNode; onClick?: () => void }>
  avatarUrl?: string
  avatarFallback?: string
  onNotificationClick?: () => void
  onSettingsClick?: () => void
}

function NavigationBar({ 
  brandName = "BrandName",
  navItems = [
    { label: "Home", icon: <House className="mr-2" /> },
    { label: "Analytics", icon: <ChartBar className="mr-2" /> },
    { label: "Projects", icon: <Folder className="mr-2" /> }
  ],
  avatarUrl = "https://i.pravatar.cc/150?img=3",
  avatarFallback = "U",
  onNotificationClick,
  onSettingsClick
}: NavigationBarProps) {
  return (
    <div className="border-b border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h3 className="text-xl font-bold">{brandName}</h3>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.label} variant="ghost" size="sm" onClick={item.onClick}>
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onNotificationClick}>
            <Bell />
          </Button>
          <Button variant="ghost" size="icon" onClick={onSettingsClick}>
            <Gear />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}`,
  dataTable: `interface Transaction {
  id: string
  status: string
  statusVariant?: "default" | "secondary" | "destructive" | "outline"
  description: string
  date: string
  amount: string
  isNegative?: boolean
}

interface DataTableProps {
  title?: string
  exportButtonText?: string
  transactions?: Transaction[]
  onExport?: () => void
}

function DataTable({ 
  title = "Recent Transactions",
  exportButtonText = "Export",
  transactions = [
    { id: "1", status: "Completed", description: "Payment received", date: "Mar 15, 2024", amount: "$250.00" }
  ],
  onExport
}: DataTableProps) {
  return (
    <Card>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Button variant="outline" size="sm" onClick={onExport}>
            {exportButtonText}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Transaction</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Badge variant={transaction.statusVariant}>{transaction.status}</Badge>
              </TableCell>
              <TableCell className="font-medium">{transaction.description}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell className={cn(
                "text-right",
                transaction.isNegative && "text-destructive"
              )}>{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}`,
  form: `interface CreateAccountFormProps {
  title?: string
  description?: string
  firstNameLabel?: string
  lastNameLabel?: string
  emailLabel?: string
  firstNamePlaceholder?: string
  lastNamePlaceholder?: string
  emailPlaceholder?: string
  cancelButtonText?: string
  submitButtonText?: string
  onCancel?: () => void
  onSubmit?: (data: { firstName: string; lastName: string; email: string }) => void
}

function CreateAccountForm({ 
  title = "Create Account",
  description = "Fill in your details to get started",
  firstNameLabel = "First Name",
  lastNameLabel = "Last Name",
  emailLabel = "Email",
  firstNamePlaceholder = "John",
  lastNamePlaceholder = "Doe",
  emailPlaceholder = "john@example.com",
  cancelButtonText = "Cancel",
  submitButtonText = "Create Account",
  onCancel,
  onSubmit
}: CreateAccountFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({ firstName, lastName, email })
  }

  return (
    <Card className="p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{firstNameLabel}</Label>
            <Input 
              id="firstName" 
              placeholder={firstNamePlaceholder}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{lastNameLabel}</Label>
            <Input 
              id="lastName" 
              placeholder={lastNamePlaceholder}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{emailLabel}</Label>
          <div className="relative">
            <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              id="email" 
              type="email" 
              placeholder={emailPlaceholder} 
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            {cancelButtonText}
          </Button>
          <Button type="submit">
            {submitButtonText}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </form>
    </Card>
  )
}`,
  taskList: `interface Task {
  id: string
  title: string
  description: string
  status: string
  statusColor?: "accent" | "destructive"
  badgeText: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  icon: React.ReactNode
}

interface TaskListProps {
  title?: string
  addButtonText?: string
  tasks?: Task[]
  onAddTask?: () => void
}

function TaskList({ 
  title = "Project Tasks",
  addButtonText = "Add Task",
  tasks = [
    {
      id: "1",
      title: "Design system documentation",
      description: "Complete the component library documentation",
      status: "Completed",
      statusColor: "accent" as const,
      badgeText: "Design",
      badgeVariant: "secondary" as const,
      icon: <CheckCircle weight="fill" className="h-6 w-6 text-accent mt-0.5" />
    }
  ],
  onAddTask
}: TaskListProps) {
  return (
    <Card>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Button size="sm" onClick={onAddTask}>
            <Plus className="mr-2" />
            {addButtonText}
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-4">
              {task.icon}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant={task.badgeVariant}>{task.badgeText}</Badge>
                  <span className="text-xs text-muted-foreground">{task.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}`,
  sidebarNavigation: `interface SidebarNavItem {
  label: string
  icon: React.ReactNode
  variant?: "default" | "ghost"
  onClick?: () => void
}

interface SidebarNavigationProps {
  title?: string
  navItems?: SidebarNavItem[]
  contentText?: string
}

function SidebarNavigation({ 
  title = "Dashboard",
  navItems = [
    { label: "Home", icon: <House className="mr-2" />, variant: "ghost" as const },
    { label: "Analytics", icon: <ChartBar className="mr-2" />, variant: "default" as const },
    { label: "Projects", icon: <Folder className="mr-2" />, variant: "ghost" as const }
  ],
  contentText = "Main content area"
}: SidebarNavigationProps) {
  return (
    <div className="flex">
      <aside className="w-64 border-r border-border bg-card/50 p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded-lg bg-accent" />
            <span className="font-bold">{title}</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button 
                key={item.label}
                variant={item.variant || "ghost"} 
                className="w-full justify-start"
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 p-6">
        <p className="text-sm text-muted-foreground">
          {contentText}
        </p>
      </div>
    </div>
  )
}`,
}

export const templatesCodeSnippets = {
  dashboardLayout: `interface StatCard {
  label: string
  value: string
  trend?: string
}

interface DashboardLayoutProps {
  title?: string
  navItems?: Array<{ label: string; icon: React.ReactNode; variant?: "default" | "ghost" }>
  avatarUrl?: string
  avatarFallback?: string
  stats?: StatCard[]
  onNotificationClick?: () => void
}

function DashboardLayout({ 
  title = "Dashboard",
  navItems = [
    { label: "Overview", icon: <House className="mr-2" />, variant: "default" as const },
    { label: "Analytics", icon: <ChartBar className="mr-2" />, variant: "ghost" as const }
  ],
  avatarUrl,
  avatarFallback = "U",
  stats = [
    { label: "Total Revenue", value: "$45,231", trend: "+20.1% from last month" }
  ],
  onNotificationClick
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onNotificationClick}>
              <Bell />
            </Button>
            <Avatar className="h-8 w-8">
              {avatarUrl && <AvatarImage src={avatarUrl} />}
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/30 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button 
                key={item.label}
                variant={item.variant || "ghost"} 
                className="w-full justify-start"
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold">Overview</h1>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                {stat.trend && (
                  <p className="text-sm text-accent mt-2">{stat.trend}</p>
                )}
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}`,
  landingPage: `interface LandingPageProps {
  brandName?: string
  navItems?: string[]
  badge?: string
  headline?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  onPrimaryCta?: () => void
  onSecondaryCta?: () => void
}

function LandingPage({ 
  brandName = "ProductName",
  navItems = ["Features", "Sign Up"],
  badge = "New Release",
  headline = "Build Amazing Products Faster",
  description = "The complete toolkit for modern product development.",
  primaryCta = "Get Started",
  secondaryCta,
  onPrimaryCta,
  onSecondaryCta
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent" />
            <h3 className="text-xl font-bold">{brandName}</h3>
          </div>
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button key={item} variant="ghost" size="sm">{item}</Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-12 text-center bg-gradient-to-br from-primary/20 to-accent/20">
        <Badge className="mb-4">{badge}</Badge>
        <h1 className="text-5xl font-bold mb-6">
          {headline}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" onClick={onPrimaryCta}>
            {primaryCta}
            <ArrowRight className="ml-2" />
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" onClick={onSecondaryCta}>
              {secondaryCta}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}`,
  ecommercePage: `interface EcommercePageProps {
  storeName?: string
  productBadge?: string
  productName?: string
  productPrice?: string
  originalPrice?: string
  onAddToCart?: () => void
}

function EcommercePage({ 
  storeName = "Store",
  productBadge = "New Arrival",
  productName = "Premium Product",
  productPrice = "$299.00",
  originalPrice,
  onAddToCart
}: EcommercePageProps) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{storeName}</h3>
          <Button variant="ghost" size="icon">
            <ShoppingCart />
          </Button>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-2 gap-12">
          <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-accent" />
          <div className="space-y-6">
            <Badge>{productBadge}</Badge>
            <h1 className="text-4xl font-bold">{productName}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{productPrice}</span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            <Button size="lg" className="w-full" onClick={onAddToCart}>
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  blogArticle: `interface BlogArticleProps {
  blogName?: string
  tags?: string[]
  title?: string
  authorName?: string
  authorAvatar?: string
  authorFallback?: string
  date?: string
  readTime?: string
  excerpt?: string
}

function BlogArticle({ 
  blogName = "Blog",
  tags = ["Design", "Tutorial"],
  title = "Building a Comprehensive Component Library",
  authorName = "Alex Writer",
  authorAvatar,
  authorFallback = "AW",
  date = "March 15, 2024",
  readTime = "10 min read",
  excerpt = "Design systems have become an essential part of modern product development."
}: BlogArticleProps) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card p-4">
        <h3 className="text-xl font-bold">{blogName}</h3>
      </div>
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex gap-2">
            {tags.map((tag, idx) => (
              <Badge key={tag} variant={idx === 0 ? "default" : "secondary"}>
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-5xl font-bold">
            {title}
          </h1>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              {authorAvatar && <AvatarImage src={authorAvatar} />}
              <AvatarFallback>{authorFallback}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{authorName}</p>
              <p className="text-sm text-muted-foreground">
                {date} · {readTime}
              </p>
            </div>
          </div>
          <div className="aspect-video rounded-lg bg-gradient-to-br from-primary to-accent" />
          <p className="text-lg text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>
    </div>
  )
}`,
}
