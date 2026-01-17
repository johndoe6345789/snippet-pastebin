import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import {
  Heart,
  Star,
  Lightning,
  Check,
  X,
  Plus,
  Minus,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import { ComponentShowcase } from '@/components/ComponentShowcase'
import { atomsCodeSnippets } from '@/lib/component-code-snippets'
import { Snippet } from '@/lib/types'

interface AtomsSectionProps {
  onSaveSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function AtomsSection({ onSaveSnippet }: AtomsSectionProps) {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Buttons</h2>
          <p className="text-muted-foreground">
            Interactive controls with multiple variants and states
          </p>
        </div>
        
        <ComponentShowcase
          code={atomsCodeSnippets.buttonWithIcons}
          title="Button with Icons"
          description="Buttons with icon and text combinations"
          category="atoms"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="p-6">
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Heart weight="fill" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  With Icons
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Star weight="fill" />
                    Favorite
                  </Button>
                  <Button variant="outline">
                    <Plus weight="bold" />
                    Add Item
                  </Button>
                  <Button variant="secondary">
                    <Lightning weight="fill" />
                    Quick Action
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  States
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>
                    Disabled Outline
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </ComponentShowcase>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Badges</h2>
          <p className="text-muted-foreground">
            Small status indicators and labels
          </p>
        </div>
        
        <ComponentShowcase
          code={atomsCodeSnippets.badgeWithIcons}
          title="Badge with Icons"
          description="Badge components with icon combinations"
          category="atoms"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="p-6">
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  With Icons
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Badge>
                    <Check weight="bold" className="mr-1" />
                    Completed
                  </Badge>
                  <Badge variant="destructive">
                    <X weight="bold" className="mr-1" />
                    Failed
                  </Badge>
                  <Badge variant="secondary">
                    <Star weight="fill" className="mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </ComponentShowcase>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Inputs</h2>
          <p className="text-muted-foreground">
            Form input fields for user data entry
          </p>
        </div>
        
        <ComponentShowcase
          code={atomsCodeSnippets.inputWithIcon}
          title="Input with Icon"
          description="Input field with icon decoration"
          category="atoms"
          onSaveSnippet={onSaveSnippet}
        >
          <Card className="p-6">
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  States
                </h3>
                <div className="space-y-4 max-w-md">
                  <Input placeholder="Default input" />
                  <Input placeholder="Disabled input" disabled />
                  <div className="relative">
                    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-10" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Types
                </h3>
                <div className="space-y-4 max-w-md">
                  <Input type="text" placeholder="Text input" />
                  <Input type="email" placeholder="email@example.com" />
                  <Input type="password" placeholder="Password" />
                  <Input type="number" placeholder="123" />
                </div>
              </div>
            </div>
          </Card>
        </ComponentShowcase>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Typography</h2>
          <p className="text-muted-foreground">
            Text styles and hierarchical type scale
          </p>
        </div>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">Heading 1</h1>
              <p className="text-sm text-muted-foreground">
                Bricolage Grotesque Bold / 48px
              </p>
            </div>
            <Separator />
            <div>
              <h2 className="text-4xl font-semibold mb-2">Heading 2</h2>
              <p className="text-sm text-muted-foreground">
                Bricolage Grotesque Semibold / 36px
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-3xl font-semibold mb-2">Heading 3</h3>
              <p className="text-sm text-muted-foreground">
                Bricolage Grotesque Semibold / 30px
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="text-2xl font-medium mb-2">Heading 4</h4>
              <p className="text-sm text-muted-foreground">
                Bricolage Grotesque Medium / 24px
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-base mb-2">
                Body text - The quick brown fox jumps over the lazy dog. This is
                regular body text used for paragraphs and general content.
              </p>
              <p className="text-sm text-muted-foreground">Inter Regular / 16px</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Small text - Additional information, captions, and secondary content.
              </p>
              <p className="text-sm text-muted-foreground">Inter Regular / 14px</p>
            </div>
            <Separator />
            <div>
              <code className="text-sm bg-muted px-2 py-1 rounded">
                const example = "code text";
              </code>
              <p className="text-sm text-muted-foreground mt-2">
                JetBrains Mono Regular / 14px
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Icons</h2>
          <p className="text-muted-foreground">
            Phosphor icon set with multiple weights
          </p>
        </div>
        
        <Card className="p-6">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
            <div className="flex flex-col items-center gap-2">
              <Heart className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Heart</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Star</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Lightning className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Lightning</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Check className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Check</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <X className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">X</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Plus className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Plus</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Minus className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Minus</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MagnifyingGlass className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">Search</span>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Colors</h2>
          <p className="text-muted-foreground">
            Semantic color palette with accessibility in mind
          </p>
        </div>
        
        <Card className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-primary" />
              <div>
                <p className="font-medium">Primary</p>
                <code className="text-xs text-muted-foreground">
                  oklch(0.50 0.18 310)
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-secondary" />
              <div>
                <p className="font-medium">Secondary</p>
                <code className="text-xs text-muted-foreground">
                  oklch(0.30 0.08 310)
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-accent" />
              <div>
                <p className="font-medium">Accent</p>
                <code className="text-xs text-muted-foreground">
                  oklch(0.72 0.20 25)
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-destructive" />
              <div>
                <p className="font-medium">Destructive</p>
                <code className="text-xs text-muted-foreground">
                  oklch(0.577 0.245 27.325)
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-muted" />
              <div>
                <p className="font-medium">Muted</p>
                <code className="text-xs text-muted-foreground">
                  oklch(0.25 0.06 310)
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-card border border-border" />
              <div>
                <p className="font-medium">Card</p>
                <code className="text-xs text-muted-foreground">
                  oklch(0.20 0.12 310)
                </code>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
