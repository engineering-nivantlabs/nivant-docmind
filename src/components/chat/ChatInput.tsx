import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export default function ChatInput({ onSend, disabled, placeholder = 'Ask anything about this document...' }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="border-t border-border bg-background p-4"
    >
      <div className="max-w-3xl mx-auto flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="min-h-[44px] max-h-[160px] resize-none pr-12 py-3 text-sm rounded-xl border-border bg-muted/50 focus:bg-background"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          size="icon"
          className="h-10 w-10 rounded-xl bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white flex-shrink-0"
        >
          <Send size={16} />
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        AI may produce inaccurate information. Always verify important details.
      </p>
    </motion.div>
  )
}
