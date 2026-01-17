import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AIErrorHelper } from "@/components/error/AIErrorHelper";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertTriangleIcon, RefreshCwIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckIcon } from "lucide-react";

interface ErrorFallbackProps {
  error: Error;
}

export function ErrorFallback({ error }: ErrorFallbackProps) {
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
          <AlertDescription className="mt-3 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm bg-destructive/20 px-2 py-1 rounded flex-1 break-all">
                {error.message}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <Collapsible open={isStackOpen} onOpenChange={setIsStackOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between"
                >
                  {isStackOpen ? (
                    <>
                      Hide Stack Trace <ChevronUpIcon className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Show Stack Trace <ChevronDownIcon className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4">
                  <pre className="text-xs bg-destructive/10 p-3 rounded overflow-auto max-h-60">
                    {error.stack || 'No stack trace available'}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </AlertDescription>
        </Alert>

        <AIErrorHelper error={error} />

        <Button
          onClick={() => window.location.reload()}
          className="w-full mt-6"
          variant="outline"
        >
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Try Reloading
        </Button>
      </div>
    </div>
  );
}
