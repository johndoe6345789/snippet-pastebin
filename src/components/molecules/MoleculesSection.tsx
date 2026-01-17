import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  MagnifyingGlass,
  Heart,
  ChatCircle,
  Share,
  DotsThree,
  User,
  Envelope,
  Lock,
  Calendar,
} from '@phosphor-icons/react'
import { ComponentShowcase } from '@/components/demo/ComponentShowcase'
import { moleculesCodeSnippets } from '@/lib/component-code-snippets'
import { Snippet } from '@/lib/types'

interface MoleculesSectionProps {
  onSaveSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function MoleculesSection({ onSaveSnippet }: MoleculesSectionProps) {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Form Fields</h2>
          <p className="text-muted-foreground">
            Input fields with labels and helper text
          </p>
        </div>

        <ComponentShowcase
          code={moleculesCodeSnippets.formField}
          title="Form Field with Icon and Helper Text"
          description="Complete form field with label, icon, and validation message"
          category="molecules"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="p-6">
            <div className="space-y-6 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll never share your email with anyone else.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
            </div>
          </Card>
        </ComponentShowcase>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Search Bars</h2>
          <p className="text-muted-foreground">
            Combined search input with actions
          </p>
        </div>

        <ComponentShowcase
          code={moleculesCodeSnippets.searchBarWithButton}
          title="Search Bar with Button"
          description="Search input combined with action button"
          category="molecules"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="p-6">
            <div className="space-y-6">
              <div className="relative max-w-md">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10" />
              </div>

              <Separator />

              <div className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-10" />
                </div>
                <Button>Search</Button>
              </div>

              <Separator />

              <div className="relative max-w-md">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search products, articles, documentation..." className="pl-10 h-12" />
              </div>
            </div>
          </Card>
        </ComponentShowcase>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">User Cards</h2>
          <p className="text-muted-foreground">
            Profile information with avatar and actions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
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
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg">Jordan Davis</h3>
                <p className="text-sm text-muted-foreground mb-2">Senior Developer</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Social Actions</h2>
          <p className="text-muted-foreground">
            Grouped interactive buttons for social features
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
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
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Heart weight="fill" className="text-destructive mr-2" />
                  <span className="text-foreground">256</span>
                </Button>
                <Button variant="outline" size="sm">
                  <ChatCircle className="mr-2" />
                  <span>42</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Share />
                </Button>
                <Button variant="ghost" size="sm">
                  <DotsThree weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Status Indicators</h2>
          <p className="text-muted-foreground">
            Combined elements showing status and information
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
                <span className="font-medium">System Online</span>
              </div>
              <Badge>Active</Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="font-medium">Service Unavailable</span>
              </div>
              <Badge variant="destructive">Error</Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-muted" />
                <span className="font-medium">Maintenance Mode</span>
              </div>
              <Badge variant="secondary">Scheduled</Badge>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Content Preview Cards</h2>
          <p className="text-muted-foreground">
            Compact cards displaying content with metadata
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
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
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    Advanced TypeScript Patterns
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Explore advanced type system features and practical patterns for production apps.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Mar 12, 2024</span>
                </div>
                <span>•</span>
                <span>8 min read</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tutorial</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
