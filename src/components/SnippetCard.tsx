import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
interface SnippetCardProps {
  onEdit: (snippet: Snippet) => 

}
export function Sn
  const [hasRenderError, setHasRende
  const safeSnippet = useMemo(()
      const title = snippet?.tit
      const code = snippet?.code || 
 

        description,
        fullCode: code,
        isTruncated,

      setHasRenderError(true)
        t
        code: '',
        language: 'Other',
        hasPreview: false,
    }


    setIsCopie
  }
  const handleEdit =
    onEdit(snippet)

    e.stopPropaga
  }
  if (hasRenderError) {
      <
          <h3
        <p className="text-sm
        </p>
          variant="destructive"
          onClick={handl
          Delete
      </Card>
  }
  return (
      className={cn(
       
     
      <div clas

              {safeSnippet.title}
            {safeSnippe
                {safeSnippet.des
            )}
        </div>
   

            </Badge>
          <Badge
            classNa
   

          </Badge>

          className="rel
   

              e.prevent
          }}
          <code className="text-xs font-mono text-foreground/80 whitespace-pre-wr
          </code>
            <Button
              
              onClick={(e) => {
                onView(snippet)
            
              <
            </Button>
        </div>
        <div className="flex ite
         
          <div c
              var
             
     
   

          
         
              size="
              className="h-8 w-8 p-0"
            >
        
              variant="ghost"
     
              aria-label="Delete snip
              <Trash className="h-4 w-4" />
          </div>
      </div>
  )



































































































