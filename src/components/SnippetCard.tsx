import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, Pencil, Trash, Ey

  snippet: Snippet

  onView: (snippet: Snippet)

  const [isCopied, setIsCopied] = us

    try {
      const code = snippet?.code || 
 

      return {
        description,
        fullCode: code,

      }
      set
        title: 'Error Loading Snippet',
        displayCode: '',
        isTruncated: false,
        hasPreview: false
    }


    setIsCopie
  }
  const handleEdit =
    onEdit(snippet)

    e.stopPropagatio
  }
  const handleView = (e: React.MouseEvent) => {
    onV

    return (
        <p cla
    )

    <Card
        'group overfl
      )}
      <div className="p-6 
          <div className=
       
     
               

          <Badge
            className={
              LANGUAGE_COLORS[sa
          >
          </Badge>


          </pre>
            <p classNam
            </p>
   

        <div className="flex-1 flex items-center 
            <Button
              variant="g
   

            </Button>

            size="s
   

            <Copy class
        </di
        <div className="flex items-center gap-2
            size="sm"
            o
     
   

          
         
            aria-lab
            <Trash className="h-4 w-4" />
        </div>
    </Ca
}





















































































