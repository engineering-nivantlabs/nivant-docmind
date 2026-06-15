import { motion } from 'framer-motion'
import { User, Bot, FileText } from 'lucide-react'
import type { ChatMessage } from '@/data/mockData'
import { cn } from '@/lib/utils'

interface ChatBubbleProps {
  message: ChatMessage
  index: number
}

export default function ChatBubble({ message, index }: ChatBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      }}
      className={cn('flex gap-3 max-w-[85%]', isUser ? 'ml-auto flex-row-reverse' : 'mr-auto')}
    >
      <div
        className={cn(
          'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
          isUser ? 'bg-[hsl(158,64%,40%)]' : 'bg-muted'
        )}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-muted-foreground" />
        )}
      </div>

      <div
        className={cn(
          'rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
          isUser
            ? 'bg-[hsl(158,64%,40%)] text-white rounded-tr-sm'
            : 'bg-muted text-foreground rounded-tl-sm'
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/20 dark:border-white/10">
            <p className="text-xs opacity-80 mb-1.5 flex items-center gap-1">
              <FileText size={10} />
              Sources:
            </p>
            <div className="space-y-1">
              {message.sources.map((source, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-xs mr-2"
                >
                  Page {source.page}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
