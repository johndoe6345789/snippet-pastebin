import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  List,
  GridFour,
  Bell,
  Gear,
  SignOut,
  User,
  House,
  ChartBar,
  Folder,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Envelope,
  Lock,
  Plus,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { ComponentShowcase } from '@/components/demo/ComponentShowcase'
import { organismsCodeSnippets } from '@/lib/component-code-snippets'
import { Snippet } from '@/lib/types'

interface OrganismsSectionProps {
  onSaveSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function OrganismsSection({ onSaveSnippet }: OrganismsSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Navigation Bars</h2>
          <p className="text-muted-foreground">
            Complete navigation components with branding and actions
          </p>
        </div>

        <ComponentShowcase
          code={organismsCodeSnippets.navigationBar}
          title="Navigation Bar"
          description="Primary navigation with user menu and notifications"
          category="organisms"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="overflow-hidden">
            <div className="border-b border-border bg-card p-4">
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
            </div>

            <div className="p-6">
              <p className="text-sm text-muted-foreground">
                Primary navigation with user menu and notifications
              </p>
            </div>
          </Card>
        </ComponentShowcase>

        <Card className="overflow-hidden">
          <div className="border-b border-border bg-card">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-accent" />
                  <h3 className="text-xl font-bold">Product</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button size="sm">Get Started</Button>
              </div>
            </div>
            <nav className="px-4 pb-2 flex items-center gap-1 overflow-x-auto">
              <Button variant="ghost" size="sm" className="text-accent">
                Features
              </Button>
              <Button variant="ghost" size="sm">
                Pricing
              </Button>
              <Button variant="ghost" size="sm">
                Documentation
              </Button>
              <Button variant="ghost" size="sm">
                Blog
              </Button>
            </nav>
          </div>

          <div className="p-6">
            <p className="text-sm text-muted-foreground">
              Marketing site navigation with CTAs
            </p>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Data Tables</h2>
          <p className="text-muted-foreground">
            Structured data display with actions
          </p>
        </div>

        <Card>
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
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell className="font-medium">Processing payment</TableCell>
                <TableCell>Mar 14, 2024</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>Completed</Badge>
                </TableCell>
                <TableCell className="font-medium">Refund issued</TableCell>
                <TableCell>Mar 13, 2024</TableCell>
                <TableCell className="text-right text-destructive">-$75.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="destructive">Failed</Badge>
                </TableCell>
                <TableCell className="font-medium">Payment declined</TableCell>
                <TableCell>Mar 12, 2024</TableCell>
                <TableCell className="text-right">$0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Forms</h2>
          <p className="text-muted-foreground">
            Complete form layouts with validation and actions
          </p>
        </div>

        <Card className="p-6">
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
              <Label htmlFor="formEmail">Email</Label>
              <div className="relative">
                <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="formEmail" type="email" placeholder="john@example.com" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="formPassword">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="formPassword" type="password" placeholder="••••••••" className="pl-10" />
              </div>
              <p className="text-sm text-muted-foreground">
                Must be at least 8 characters
              </p>
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
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Task Lists</h2>
          <p className="text-muted-foreground">
            Interactive lists with status and actions
          </p>
        </div>

        <Card>
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

            <div className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                <Clock weight="fill" className="h-6 w-6 text-accent mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">API integration</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect frontend to backend services
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge>Development</Badge>
                    <span className="text-xs text-muted-foreground">In Progress</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                <XCircle weight="fill" className="h-6 w-6 text-destructive mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">Performance optimization</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Improve page load times and reduce bundle size
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge variant="destructive">Blocked</Badge>
                    <span className="text-xs text-muted-foreground">Needs review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Content Grids</h2>
          <p className="text-muted-foreground">
            Switchable grid and list views with filtering
          </p>
        </div>

        <Card>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="font-semibold text-lg">Projects</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <GridFour />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List />
                </Button>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="space-y-3">
                    <div className="h-32 rounded-lg bg-gradient-to-br from-primary to-accent" />
                    <h4 className="font-semibold">Project {i}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      A brief description of this project and its goals.
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline">Active</Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">Project {i}</h4>
                      <p className="text-sm text-muted-foreground">
                        A brief description of this project
                      </p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Sidebar Navigation</h2>
          <p className="text-muted-foreground">
            Complete sidebar with nested navigation
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="flex">
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
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2" />
                    Team
                  </Button>
                </nav>

                <Separator />

                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <Gear className="mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive">
                    <SignOut className="mr-2" />
                    Sign Out
                  </Button>
                </nav>
              </div>
            </aside>

            <div className="flex-1 p-6">
              <p className="text-sm text-muted-foreground">
                Sidebar with navigation items and user actions
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
