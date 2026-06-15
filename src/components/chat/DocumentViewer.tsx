import { FileText, X } from 'lucide-react'
import { useDocuments } from '@/context/DocumentContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DocumentViewerProps {
  className?: string
  onClose?: () => void
}

const mockPdfPages = [
  { page: 1, text: 'Q3 2024 Financial Report\n\nExecutive Summary\n\nThis report covers the financial performance for the third quarter of 2024, including revenue, expenses, and forward-looking projections.' },
  { page: 2, text: 'Key Highlights\n\n- Revenue: $12.4M (+15.3% QoQ)\n- Operating Income: $1.3M\n- Net Income: $1.1M\n- Cash Flow from Operations: $2.4M\n- Ending Cash Balance: $8.7M' },
  { page: 3, text: 'Revenue Breakdown\n\nTotal Q3 2024 revenue: $12.4M (+15.3% QoQ, +28.7% YoY)\n\nBy Product Line:\n- SaaS Subscriptions: $7.8M (63%)\n- Professional Services: $2.4M (19%)\n- Enterprise Licenses: $2.2M (18%)' },
  { page: 4, text: 'Operating Expenses\n\nResearch & Development: $3.2M (25.8% of revenue)\nSales & Marketing: $2.8M (22.6% of revenue)\nGeneral & Administrative: $1.6M (12.9% of revenue)\nCost of Revenue: $2.1M (16.9% of revenue)\nOperations: $1.4M (11.3% of revenue)' },
  { page: 5, text: 'Cash Flow Statement\n\nOperating Activities: +$2.4M\nInvesting Activities: -$1.8M\nFinancing Activities: -$0.5M\nNet Change: +$0.1M\nEnding Balance: $8.7M' },
]

export default function DocumentViewer({ className, onClose }: DocumentViewerProps) {
  const { documents, activeDocumentId } = useDocuments()

  const activeDoc = documents.find(d => d.id === activeDocumentId)

  return (
    <div className={cn('flex flex-col h-full border-l border-border bg-muted/30', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={16} className="text-[hsl(158,64%,40%)] flex-shrink-0" />
          <span className="text-sm font-medium truncate">
            {activeDoc?.name || 'Select a document'}
          </span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={onClose}>
            <X size={14} />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {mockPdfPages.map((page) => (
            <div
              key={page.page}
              className="bg-white dark:bg-card rounded-lg border border-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Page {page.page}
                </span>
                <div className="w-8 h-0.5 bg-border" />
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-serif">
                {page.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
