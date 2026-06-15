import { motion } from 'framer-motion'
import { FileText, Link2, Trash2, MessageSquare, Clock } from 'lucide-react'
import type { Document } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useDocuments } from '@/context/DocumentContext'

interface DocumentCardProps {
  document: Document
  index: number
  onChat?: (docId: string) => void
}

export default function DocumentCard({ document, index, onChat }: DocumentCardProps) {
  const { setActiveDocumentId, setActiveSessionId, removeDocument, createSession } = useDocuments()

  const handleChat = () => {
    setActiveDocumentId(document.id)
    const sessionId = createSession(document.id, `Chat about ${document.name}`)
    setActiveSessionId(sessionId)
    onChat?.(document.id)
  }

  const statusColors = {
    ready: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-border">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] flex items-center justify-center">
              {document.type === 'url' ? (
                <Link2 size={18} className="text-[hsl(158,64%,40%)]" />
              ) : (
                <FileText size={18} className="text-[hsl(158,64%,40%)]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate" title={document.name}>
                {document.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText size={10} />
                  {document.pages} {document.pages === 1 ? 'page' : 'pages'}
                </span>
                <span>{document.size}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={cn('text-xs px-2 py-0.5', statusColors[document.status])}>
                    {document.status}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={10} />
                    {formatDate(document.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={handleChat}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1.5 flex-1"
                >
                  <MessageSquare size={12} />
                  Chat
                </Button>
                <Button
                  onClick={() => removeDocument(document.id)}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1.5 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
