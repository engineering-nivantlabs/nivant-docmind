import { Plus, MessageSquare, Trash2, FileText } from 'lucide-react'
import { useDocuments } from '@/context/DocumentContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'

interface ChatSidebarProps {
  onNewChat: () => void
}

export default function ChatSidebar({ onNewChat }: ChatSidebarProps) {
  const { documents, chatSessions, activeDocumentId, activeSessionId, setActiveSessionId, setActiveDocumentId, deleteSession } = useDocuments()

  const activeDoc = documents.find(d => d.id === activeDocumentId)
  const docSessions = chatSessions.filter(s => s.documentId === activeDocumentId)

  return (
    <div className="flex flex-col h-full w-full bg-muted/30 border-r border-border">
      <div className="p-3 border-b border-border bg-background">
        <Button
          onClick={onNewChat}
          className="w-full bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white gap-2"
          size="sm"
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>

      {activeDoc && (
        <div className="px-3 py-2 border-b border-border bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)]">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-[hsl(158,64%,40%)] flex-shrink-0" />
            <span className="text-xs font-medium truncate text-[hsl(158,64%,35%)] dark:text-[hsl(158,64%,60%)]">
              {activeDoc.name}
            </span>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {docSessions.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <MessageSquare size={20} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">No conversations yet</p>
              <p className="text-xs text-muted-foreground mt-0.5">Start a new chat</p>
            </div>
          ) : (
            docSessions.map(session => (
              <button
                key={session.id}
                onClick={() => {
                  setActiveSessionId(session.id)
                  setActiveDocumentId(session.documentId)
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-colors group',
                  activeSessionId === session.id
                    ? 'bg-[hsl(158,64%,95%)] text-[hsl(158,64%,35%)] border-l-2 border-l-[hsl(158,64%,40%)]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-l-transparent'
                )}
              >
                <MessageSquare size={14} className="flex-shrink-0" />
                <span className="flex-1 truncate text-xs font-medium">{session.title}</span>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    deleteSession(session.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </button>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border bg-background">
        <div className="flex items-center gap-2">
          <UserAvatar name="Demo User" fallback="DU" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Demo User</p>
            <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
