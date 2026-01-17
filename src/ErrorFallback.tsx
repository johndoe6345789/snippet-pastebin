import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { AIErrorHelper } from "./components/AIErrorHelper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";
import { AlertTriangleIcon, RefreshCwIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckIcon } from "lucide-react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (import.meta.env.DEV) throw error;
  
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const errorDetails = `Error: ${error.message}\n\nStack Trace:\n${error.stack || 'No stack trace available'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(errorDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangleIcon />
          <AlertTitle>This spark has encountered a runtime error</AlertTitle>
          <AlertDescription>
            Something unexpected happened while running the application. The error details are shown below. Contact the spark author and let them know about this issue.
          </AlertDescription>
        </Alert>
        
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-destructive">Error Message</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <CopyIcon className="h-3.5 w-3.5" />
                  Copy All
                </>
              )}
            </Button>
          </div>
          
          <p className="text-sm text-foreground mb-4 font-mono bg-muted p-3 rounded">
            {error.message}
          </p>

          <Collapsible open={isStackOpen} onOpenChange={setIsStackOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 w-full justify-start"
              >
                {isStackOpen ? (
                  <>
                    <ChevronUpIcon className="h-4 w-4" />
                    Hide Stack Trace
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    Show Stack Trace
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4">
                <pre className="text-xs bg-muted p-4 rounded overflow-x-auto font-mono">
                  {error.stack || 'No stack trace available'}
                </pre>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="flex flex-col gap-4">
          <AIErrorHelper error={error} />
          
          <Button
            onClick={resetErrorBoundary}
            variant="outline"
            className="gap-2"
          >
            <RefreshCwIcon className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
