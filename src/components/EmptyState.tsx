import { Code, Plus, CaretDown } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { strings } from '@/lib/config'
import { SnippetTemplate } from '@/lib/types'
import templatesData from '@/data/templates.json'

const templates = templatesData as SnippetTemplate[]

interface EmptyStateProps {
  onCreateClick: () => void
  onCreateFromTemplate?: (templateId: string) => void
}

export function EmptyState({ onCreateClick, onCreateFromTemplate }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="rounded-full bg-accent/10 p-6 mb-6">
        <Code className="h-16 w-16 text-accent" weight="duotone" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">{strings.emptyState.title}</h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        {strings.emptyState.description}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="gap-2">
            <Code className="h-5 w-5" weight="bold" />
            {strings.emptyState.buttonText}
            <CaretDown weight="bold" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-72 max-h-[500px] overflow-y-auto">
          <DropdownMenuItem onClick={onCreateClick}>
            <Plus className="mr-2 h-4 w-4" weight="bold" />
            Blank Snippet
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>React Components</DropdownMenuLabel>
          {templates.filter((t) => t.category === 'react').map((template) => (
            <DropdownMenuItem
              key={template.id}
              onClick={() => onCreateFromTemplate?.(template.id)}
            >
              <div className="flex flex-col gap-1 py-1">
                <span className="font-medium">{template.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {template.description}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>JavaScript / TypeScript</DropdownMenuLabel>
          {templates.filter((t) => ['api', 'basics', 'async', 'types'].includes(t.category)).map((template) => (
            <DropdownMenuItem
              key={template.id}
              onClick={() => onCreateFromTemplate?.(template.id)}
            >
              <div className="flex flex-col gap-1 py-1">
                <span className="font-medium">{template.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {template.description}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>CSS Layouts</DropdownMenuLabel>
          {templates.filter((t) => t.category === 'layout').map((template) => (
            <DropdownMenuItem
              key={template.id}
              onClick={() => onCreateFromTemplate?.(template.id)}
            >
              <div className="flex flex-col gap-1 py-1">
                <span className="font-medium">{template.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {template.description}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
