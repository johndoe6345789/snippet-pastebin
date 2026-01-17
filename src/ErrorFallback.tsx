import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { AIErrorHelper } from "./components/AIEr
import { AlertTriangleIcon, RefreshCwIcon, ChevronDownIcon,
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";
import { AlertTriangleIcon, RefreshCwIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckIcon } from "lucide-react";

interface ErrorFallbackProps {

  if (import.meta.env.DEV) throw 
 


    navigator.clipboard.writeText(error
  

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
              onClick={handl
            >
                <>
                
        
                  <CopyIcon className="h-3.5 w-3.5" />
                </>
            </Button>
          
            {error.message}

            <CollapsibleTrigger as
                variant="ghost"
             
                {isStackO
                  
                  </>
                  <>
                   
                )}
            </Coll
              <div className="mt-4">
                  {error.s
              </div
          </Coll

          <AIErr
          
            variant="outline"
          >
            Tr

    </div>
}












































