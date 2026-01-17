import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Bell,
  Gear,
  House,
  ChartBar,
  Folder,
  MagnifyingGlass,
  Plus,
  ArrowRight,
  TrendUp,
  Users,
  ShoppingCart,
} from '@phosphor-icons/react'
import { ComponentShowcase } from '@/components/demo/ComponentShowcase'
import { templatesCodeSnippets } from '@/lib/component-code-snippets'
import { Snippet } from '@/lib/types'

interface TemplatesSectionProps {
  onSaveSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function TemplatesSection({ onSaveSnippet }: TemplatesSectionProps) {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Dashboard Layout</h2>
          <p className="text-muted-foreground">
            Complete dashboard with sidebar, stats, and content areas
          </p>
        </div>

        <ComponentShowcase
          code={templatesCodeSnippets.dashboardLayout}
          title="Dashboard Layout"
          description="Full dashboard template with navigation, sidebar, and stats"
          category="templates"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <h3 className="text-xl font-bold">Dashboard</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Bell />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Gear />
                  </Button>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

          <div className="flex">
            <aside className="w-64 border-r border-border bg-card/30 p-4 hidden lg:block">
              <nav className="space-y-1">
                <Button variant="default" className="w-full justify-start">
                  <House className="mr-2" />
                  Overview
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <ChartBar className="mr-2" />
                  Analytics
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Folder className="mr-2" />
                  Projects
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2" />
                  Team
                </Button>
              </nav>
            </aside>

            <main className="flex-1 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">Overview</h1>
                    <p className="text-muted-foreground">
                      Welcome back, here's what's happening
                    </p>
                  </div>
                  <Button>
                    <Plus className="mr-2" />
                    New Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-3xl font-bold mt-2">$45,231</p>
                        <p className="text-sm text-accent mt-2 flex items-center gap-1">
                          <TrendUp className="h-4 w-4" />
                          +20.1% from last month
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                        <p className="text-3xl font-bold mt-2">2,350</p>
                        <p className="text-sm text-accent mt-2 flex items-center gap-1">
                          <TrendUp className="h-4 w-4" />
                          +12.5% from last month
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Orders</p>
                        <p className="text-3xl font-bold mt-2">1,234</p>
                        <p className="text-sm text-accent mt-2 flex items-center gap-1">
                          <TrendUp className="h-4 w-4" />
                          +8.2% from last month
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold">Recent Activity</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">User {i}</span> completed a task
                            </p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold">Quick Actions</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Plus className="mr-2" />
                        Create New Project
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="mr-2" />
                        Invite Team Members
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Folder className="mr-2" />
                        Browse Templates
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </Card>
      </ComponentShowcase>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Landing Page</h2>
          <p className="text-muted-foreground">
            Marketing page with hero, features, and CTA sections
          </p>
        </div>

        <ComponentShowcase
          code={templatesCodeSnippets.landingPage}
          title="Landing Page Template"
          description="Full marketing page with hero, features, and CTAs"
          category="templates"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-accent" />
                  <h3 className="text-xl font-bold">ProductName</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Features
                  </Button>
                  <Button variant="ghost" size="sm">
                    Pricing
                  </Button>
                  <Button variant="ghost" size="sm">
                    About
                  </Button>
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
                The complete toolkit for modern product development. Ship faster with our
                component library and design system.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </div>
            </div>

            <div className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Features</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to build production-ready applications
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <ChartBar className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track and analyze your product metrics in real-time
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Work together with your team seamlessly
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <Gear className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Customizable</h3>
                  <p className="text-sm text-muted-foreground">
                    Adapt the platform to your specific needs
                  </p>
                </Card>
              </div>
            </div>

            <div className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of teams already building with our platform
              </p>
              <Button size="lg" variant="secondary">
                Start Free Trial
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </Card>
        </ComponentShowcase>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">E-commerce Product Page</h2>
          <p className="text-muted-foreground">
            Product detail page with images, info, and purchase options
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h3 className="text-xl font-bold">Store</h3>
                <div className="relative hidden md:block">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-10 w-80" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ShoppingCart />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-accent" />
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-gradient-to-br from-primary/50 to-accent/50"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge className="mb-3">New Arrival</Badge>
                  <h1 className="text-4xl font-bold mb-2">Premium Product Name</h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold">$299.00</span>
                    <span className="text-lg text-muted-foreground line-through">
                      $399.00
                    </span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    Experience premium quality with this exceptional product. Crafted with
                    attention to detail and designed for those who demand excellence.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Premium materials and construction</li>
                    <li>• Industry-leading performance</li>
                    <li>• 2-year warranty included</li>
                    <li>• Free shipping on orders over $50</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Button size="lg" className="w-full">
                    <ShoppingCart className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Blog Article</h2>
          <p className="text-muted-foreground">
            Article layout with header, content, and sidebar
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Blog</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Articles
                </Button>
                <Button variant="ghost" size="sm">
                  Tutorials
                </Button>
                <Button variant="ghost" size="sm">
                  About
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 mb-8">
                <div className="flex gap-2">
                  <Badge>Design</Badge>
                  <Badge variant="secondary">Tutorial</Badge>
                </div>
                <h1 className="text-5xl font-bold">
                  Building a Comprehensive Component Library
                </h1>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                    <AvatarFallback>AW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Writer</p>
                    <p className="text-sm text-muted-foreground">
                      March 15, 2024 · 10 min read
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="prose prose-invert max-w-none space-y-6">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary to-accent" />
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Design systems have become an essential part of modern product development.
                  They provide consistency, improve efficiency, and create a shared language
                  between designers and developers.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-4">
                  Understanding Atomic Design
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The atomic design methodology consists of five distinct stages: atoms,
                  molecules, organisms, templates, and pages. Each stage builds upon the
                  previous, creating a comprehensive system that scales with your needs.
                </p>

                <Card className="p-6 my-8 bg-muted/50">
                  <p className="text-sm text-muted-foreground italic">
                    "A design system is never complete. It's a living, breathing ecosystem
                    that evolves with your product and team."
                  </p>
                </Card>

                <h2 className="text-3xl font-bold mt-12 mb-4">Getting Started</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Begin by identifying the core components your product needs. Start small
                  with basic atoms like buttons and inputs, then gradually build up to more
                  complex organisms and templates.
                </p>
              </div>

              <Separator className="my-12" />

              <div className="flex items-center justify-between">
                <Button variant="outline">
                  Previous Article
                </Button>
                <Button>
                  Next Article
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
