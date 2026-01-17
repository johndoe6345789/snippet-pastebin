import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { AIErrorHelper } from "./components/AIErrorHelper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";

import { AlertTriangleIcon, RefreshCwIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckIcon } from "lucide-react";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  if (import.meta.env.DEV) throw error;

  const [isStackOpen, setIsStackOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyErrorDetails = () => {
    const errorDetails = `Error: ${error.message}\n\nStack Trace:\n${error.stack || 'No stack trace available'}`;
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
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Error Message:</h3>
            <Button
              onClick={copyErrorDetails}
              size="sm"
              variant="ghost"
              className="h-7 gap-1.5"
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
          <pre className="text-xs text-destructive bg-destructive/10 p-3 rounded border border-destructive/20 overflow-auto max-h-20 font-mono">
            {error.message}
          </pre>

          {error.stack && (
            <Collapsible open={isStackOpen} onOpenChange={setIsStackOpen} className="mt-4">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between h-8 text-xs font-medium hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    Stack Trace
                    <span className="text-muted-foreground font-normal">
                      ({error.stack.split('\n').length - 1} frames)
                    </span>
                  </span>
                  {isStackOpen ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <pre className="text-xs text-foreground/80 bg-muted/50 p-3 rounded border overflow-auto max-h-96 font-mono leading-relaxed">
                  {error.stack}
                </pre>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        {error.componentStack && (
          <div className="bg-card border rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">Component Stack:</h3>
            <pre className="text-xs text-foreground/70 bg-muted/50 p-3 rounded border overflow-auto max-h-48 font-mono leading-relaxed">
              {error.componentStack}
            </pre>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <AIErrorHelper error={error} context="Application runtime error" />
          
          <Button 
            onClick={resetErrorBoundary} 
            className="w-full"
            variant="outline"
          >
            <RefreshCwIcon />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
