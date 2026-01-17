import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { AIErrorHelper } from "./components/AIErrorHelper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";

import { AlertTriangleIcon, RefreshCwIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckIcon } from "lucide-react";

  if (import.meta.env.DEV) throw error;
  const [isStackOpen, setIsStackOpen] =

    const errorDetails = `Error: ${error.message}\n\nSta
    setCopied(true);

  return (
      <div className="w-full max-w-3xl">
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
        
              {copied ? (
                  <CheckIcon className="h-3.5 w-3.5" />
                </>
                <>
                  Copy All
              )}
          </div>
            {error.message}

            <Collapsible 
                <B
                  size="sm" 
                >
                   
                   
                  
                    <ChevronUpIcon className="h-4 w-4"
                    <Chevr
                </B
              <C
                  {er
              </
          )}

          <div c

            </pre>
        )}
        <div className="flex flex-col gap-
          
            onClick={resetErrorBou
            variant="outline
            <RefreshCwIcon />
          </Butto
      </div>
  );













































