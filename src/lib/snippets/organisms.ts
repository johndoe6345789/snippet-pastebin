/**
 * Organisms - Complex UI patterns code snippets
 */

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

