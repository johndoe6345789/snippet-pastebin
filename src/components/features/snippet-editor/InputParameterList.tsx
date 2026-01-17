import { Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputParameter } from '@/lib/types'
import { InputParameterItem } from './InputParameterItem'

interface InputParameterListProps {
  inputParameters: InputParameter[]
  functionName: string
  onFunctionNameChange: (name: string) => void
  onAddParameter: () => void
  onRemoveParameter: (index: number) => void
  onUpdateParameter: (index: number, field: keyof InputParameter, value: string) => void
}

export function InputParameterList({
  inputParameters,
  functionName,
  onFunctionNameChange,
  onAddParameter,
  onRemoveParameter,
  onUpdateParameter,
}: InputParameterListProps) {
  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span>Preview Configuration</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddParameter}
            className="gap-2"
          >
            <Plus className="h-3 w-3" />
            Add Parameter
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="functionName" className="text-sm">
            Function/Component Name (Optional)
          </Label>
          <Input
            id="functionName"
            placeholder="e.g., MyComponent"
            value={functionName}
            onChange={(e) => onFunctionNameChange(e.target.value)}
            className="bg-background"
          />
          <p className="text-xs text-muted-foreground">
            The name of the function or component to render. Leave empty to use the default export.
          </p>
        </div>

        {inputParameters.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Input Parameters (Props)</Label>
            {inputParameters.map((param, index) => (
              <InputParameterItem
                key={index}
                param={param}
                index={index}
                onUpdate={onUpdateParameter}
                onRemove={onRemoveParameter}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
