/**
 * Templates - Complete page layouts code snippets
 */

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
