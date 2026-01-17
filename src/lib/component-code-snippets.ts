export const atomsCodeSnippets = {
  buttonDefault: `<Button>Default</Button>`,
  buttonSecondary: `<Button variant="secondary">Secondary</Button>`,
  buttonDestructive: `<Button variant="destructive">Destructive</Button>`,
  buttonOutline: `<Button variant="outline">Outline</Button>`,
  buttonGhost: `<Button variant="ghost">Ghost</Button>`,
  buttonLink: `<Button variant="link">Link</Button>`,
  buttonSizes: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Heart weight="fill" />
</Button>`,
  buttonWithIcons: `<Button>
  <Star weight="fill" />
  Favorite
</Button>
<Button variant="outline">
  <Plus weight="bold" />
  Add Item
</Button>`,
  badgeVariants: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
  badgeWithIcons: `<Badge>
  <Check weight="bold" className="mr-1" />
  Completed
</Badge>
<Badge variant="destructive">
  <X weight="bold" className="mr-1" />
  Failed
</Badge>`,
  inputBasic: `<Input placeholder="Default input" />`,
  inputWithIcon: `<div className="relative">
  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>`,
  inputTypes: `<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="123" />`,
}

export const moleculesCodeSnippets = {
  formField: `<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <div className="relative">
    <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
  </div>
  <p className="text-sm text-muted-foreground">
    We'll never share your email with anyone else.
  </p>
</div>`,
  searchBar: `<div className="relative">
  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>`,
  searchBarWithButton: `<div className="flex gap-2">
  <div className="relative flex-1">
    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    <Input placeholder="Search..." className="pl-10" />
  </div>
  <Button>Search</Button>
</div>`,
  userCard: `<Card className="p-6">
  <div className="flex items-start gap-4">
    <Avatar className="h-12 w-12">
      <AvatarImage src="https://i.pravatar.cc/150?img=1" />
      <AvatarFallback>AM</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-lg">Alex Morgan</h3>
      <p className="text-sm text-muted-foreground">@alexmorgan</p>
      <p className="text-sm mt-2">
        Product designer passionate about creating delightful user experiences.
      </p>
    </div>
    <Button size="sm" variant="outline">
      Follow
    </Button>
  </div>
</Card>`,
  socialActions: `<div className="flex items-center gap-2">
  <Button variant="ghost" size="sm">
    <Heart className="mr-2" />
    Like
  </Button>
  <Button variant="ghost" size="sm">
    <ChatCircle className="mr-2" />
    Comment
  </Button>
  <Button variant="ghost" size="sm">
    <Share className="mr-2" />
    Share
  </Button>
</div>`,
  statusIndicator: `<div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
    <span className="font-medium">System Online</span>
  </div>
  <Badge>Active</Badge>
</div>`,
  contentCard: `<Card className="p-6 hover:shadow-lg transition-shadow">
  <div className="space-y-4">
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h3 className="font-semibold text-lg line-clamp-2">
          Building Scalable Design Systems
        </h3>
        <p className="text-sm text-muted-foreground">
          Learn how to create and maintain design systems that grow with your team.
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <span>Mar 15, 2024</span>
      </div>
      <span>•</span>
      <span>5 min read</span>
    </div>
    <div className="flex gap-2">
      <Badge variant="outline">Design</Badge>
      <Badge variant="outline">System</Badge>
    </div>
  </div>
</Card>`,
}

export const organismsCodeSnippets = {
  navigationBar: `<div className="border-b border-border bg-card p-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-6">
      <h3 className="text-xl font-bold">BrandName</h3>
      <nav className="hidden md:flex items-center gap-1">
        <Button variant="ghost" size="sm">
          <House className="mr-2" />
          Home
        </Button>
        <Button variant="ghost" size="sm">
          <ChartBar className="mr-2" />
          Analytics
        </Button>
        <Button variant="ghost" size="sm">
          <Folder className="mr-2" />
          Projects
        </Button>
      </nav>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Bell />
      </Button>
      <Button variant="ghost" size="icon">
        <Gear />
      </Button>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  </div>
</div>`,
  dataTable: `<Card>
  <div className="p-4 border-b border-border">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg">Recent Transactions</h3>
      <Button variant="outline" size="sm">
        Export
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
      <TableRow>
        <TableCell>
          <Badge>Completed</Badge>
        </TableCell>
        <TableCell className="font-medium">Payment received</TableCell>
        <TableCell>Mar 15, 2024</TableCell>
        <TableCell className="text-right">$250.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Card>`,
  form: `<Card className="p-6">
  <form className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold mb-4">Create Account</h3>
      <p className="text-sm text-muted-foreground">
        Fill in your details to get started
      </p>
    </div>
    <Separator />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" placeholder="John" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" placeholder="Doe" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
      </div>
    </div>
    <Separator />
    <div className="flex items-center justify-between gap-4">
      <Button variant="outline" type="button">
        Cancel
      </Button>
      <Button type="submit">
        Create Account
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  </form>
</Card>`,
  taskList: `<Card>
  <div className="p-4 border-b border-border">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg">Project Tasks</h3>
      <Button size="sm">
        <Plus className="mr-2" />
        Add Task
      </Button>
    </div>
  </div>
  <div className="divide-y divide-border">
    <div className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-4">
        <CheckCircle weight="fill" className="h-6 w-6 text-accent mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium">Design system documentation</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Complete the component library documentation
          </p>
          <div className="flex items-center gap-4 mt-3">
            <Badge variant="secondary">Design</Badge>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</Card>`,
  sidebarNavigation: `<div className="flex">
  <aside className="w-64 border-r border-border bg-card/50 p-4">
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <div className="h-8 w-8 rounded-lg bg-accent" />
        <span className="font-bold">Dashboard</span>
      </div>
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <House className="mr-2" />
          Home
        </Button>
        <Button variant="default" className="w-full justify-start">
          <ChartBar className="mr-2" />
          Analytics
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Folder className="mr-2" />
          Projects
        </Button>
      </nav>
    </div>
  </aside>
  <div className="flex-1 p-6">
    <p className="text-sm text-muted-foreground">
      Main content area
    </p>
  </div>
</div>`,
}

export const templatesCodeSnippets = {
  dashboardLayout: `<div className="min-h-screen bg-background">
  <div className="border-b border-border bg-card p-4">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">Dashboard</h3>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </div>
  <div className="flex">
    <aside className="w-64 border-r border-border bg-card/30 p-4">
      <nav className="space-y-1">
        <Button variant="default" className="w-full justify-start">
          <House className="mr-2" />
          Overview
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <ChartBar className="mr-2" />
          Analytics
        </Button>
      </nav>
    </aside>
    <main className="flex-1 p-6">
      <h1 className="text-3xl font-bold">Overview</h1>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">$45,231</p>
        </Card>
      </div>
    </main>
  </div>
</div>`,
  landingPage: `<div className="min-h-screen">
  <div className="border-b border-border bg-card p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-accent" />
        <h3 className="text-xl font-bold">ProductName</h3>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">Features</Button>
        <Button size="sm">Sign Up</Button>
      </div>
    </div>
  </div>
  <div className="p-12 text-center bg-gradient-to-br from-primary/20 to-accent/20">
    <Badge className="mb-4">New Release</Badge>
    <h1 className="text-5xl font-bold mb-6">
      Build Amazing Products Faster
    </h1>
    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
      The complete toolkit for modern product development.
    </p>
    <Button size="lg">
      Get Started
      <ArrowRight className="ml-2" />
    </Button>
  </div>
</div>`,
  ecommercePage: `<div className="min-h-screen">
  <div className="border-b border-border bg-card p-4">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">Store</h3>
      <Button variant="ghost" size="icon">
        <ShoppingCart />
      </Button>
    </div>
  </div>
  <div className="p-8">
    <div className="grid grid-cols-2 gap-12">
      <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-accent" />
      <div className="space-y-6">
        <Badge>New Arrival</Badge>
        <h1 className="text-4xl font-bold">Premium Product</h1>
        <span className="text-3xl font-bold">$299.00</span>
        <Button size="lg" className="w-full">
          <ShoppingCart className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
</div>`,
  blogArticle: `<div className="min-h-screen">
  <div className="border-b border-border bg-card p-4">
    <h3 className="text-xl font-bold">Blog</h3>
  </div>
  <div className="p-8">
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex gap-2">
        <Badge>Design</Badge>
        <Badge variant="secondary">Tutorial</Badge>
      </div>
      <h1 className="text-5xl font-bold">
        Building a Comprehensive Component Library
      </h1>
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Alex Writer</p>
          <p className="text-sm text-muted-foreground">
            March 15, 2024 · 10 min read
          </p>
        </div>
      </div>
      <div className="aspect-video rounded-lg bg-gradient-to-br from-primary to-accent" />
      <p className="text-lg text-muted-foreground leading-relaxed">
        Design systems have become an essential part of modern product development.
      </p>
    </div>
  </div>
</div>`,
}
