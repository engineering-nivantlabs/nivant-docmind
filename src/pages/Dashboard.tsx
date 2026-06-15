import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PanelLeftClose, PanelLeftOpen, FileText, ArrowRight } from 'lucide-react'
import { useDocuments } from '@/context/DocumentContext'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatBubble from '@/components/chat/ChatBubble'
import ChatInput from '@/components/chat/ChatInput'
import ChatSidebar from '@/components/chat/ChatSidebar'
import DocumentViewer from '@/components/chat/DocumentViewer'

const mockAIResponses: Record<string, string> = {
  default: "Based on the document, I found the following information:\n\nThe Q3 2024 Financial Report shows strong performance across all key metrics. Revenue reached $12.4M, representing a 15.3% quarter-over-quarter increase.\n\nThe company maintained healthy margins with operating income of $1.3M, and cash flow from operations remained strong at $2.4M.\n\nIs there a specific section or metric you'd like me to dive deeper into?",
  revenue: "Looking at the revenue breakdown:\n\n**Total Q3 Revenue: $12.4M** (+15.3% QoQ, +28.7% YoY)\n\n- SaaS Subscriptions: $7.8M (63% of total)\n- Professional Services: $2.4M (19% of total)\n- Enterprise Licenses: $2.2M (18% of total)\n\nThe SaaS subscription line continues to be the primary growth driver, with 22% YoY growth driven by new customer acquisitions and expansion revenue from existing accounts.",
  expense: "The operating expense breakdown for Q3:\n\n1. **Research & Development: $3.2M** (25.8% of revenue)\n   - Increased headcount in engineering\n   - Investment in AI/ML infrastructure\n\n2. **Sales & Marketing: $2.8M** (22.6% of revenue)\n   - Q3 campaign spend\n   - New hire onboarding\n\n3. **General & Administrative: $1.6M** (12.9% of revenue)\n\n4. **Cost of Revenue: $2.1M** (16.9% of revenue)\n\n5. **Operations: $1.4M** (11.3% of revenue)\n\nTotal OpEx: $11.1M | Operating Income: $1.3M (10.5% margin)",
  cashflow: "Here's the Q3 2024 cash flow summary:\n\n**Operating Activities: +$2.4M**\n- Strong collections from enterprise customers\n- Improved AR turnover ratio to 12.3x\n\n**Investing Activities: -$1.8M**\n- Server infrastructure upgrade: $1.2M\n- Strategic acquisition: $0.6M\n\n**Financing Activities: -$0.5M**\n- Debt principal repayment\n\n**Net Change: +$0.1M**\n**Ending Cash Balance: $8.7M**\n\nThe company maintains a solid liquidity position with a current ratio of 2.8x.",
  summary: "Here's a summary of the Q3 2024 Financial Report:\n\n**Performance Highlights:**\n- Revenue: $12.4M (+15.3% QoQ)\n- Gross Margin: 83.1%\n- Operating Margin: 10.5%\n- Net Income: $1.1M\n\n**Key Drivers:**\n- SaaS subscription growth of 22% YoY\n- Enterprise customer expansion\n- Improved operational efficiency\n\n**Outlook:**\nThe company is well-positioned for Q4 with a strong pipeline, healthy cash reserves of $8.7M, and continued investment in R&D and infrastructure.",
}

export default function Dashboard() {
  const { documents, chatSessions, activeDocumentId, activeSessionId, addMessage, createSession } = useDocuments()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const activeDoc = documents.find(d => d.id === activeDocumentId)
  const activeSession = chatSessions.find(s => s.id === activeSessionId)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [activeSession?.messages, isTyping])

  const handleNewChat = () => {
    if (activeDocumentId) {
      const doc = documents.find(d => d.id === activeDocumentId)
      if (doc) {
        createSession(activeDocumentId, `Chat about ${doc.name}`)
      }
    }
  }

  const getAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase()
    if (lower.includes('revenue') || lower.includes('sales')) return mockAIResponses.revenue
    if (lower.includes('expense') || lower.includes('cost')) return mockAIResponses.expense
    if (lower.includes('cash') || lower.includes('flow')) return mockAIResponses.cashflow
    if (lower.includes('summar')) return mockAIResponses.summary
    return mockAIResponses.default
  }

  const handleSend = (content: string) => {
    if (!activeSessionId || !activeDocumentId) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date().toISOString(),
    }

    addMessage(activeSessionId, userMsg)
    setIsTyping(true)

    setTimeout(() => {
      const aiContent = getAIResponse(content)
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: aiContent,
        timestamp: new Date().toISOString(),
        sources: [{ page: Math.floor(Math.random() * 5) + 1, text: 'Relevant section' }],
      }
      addMessage(activeSessionId, aiMsg)
      setIsTyping(false)
    }, 1200 + Math.random() * 800)
  }

  if (!activeDoc) {
    return (
      <div className="h-[calc(100dvh-4rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] flex items-center justify-center mx-auto mb-5">
            <FileText size={28} className="text-[hsl(158,64%,40%)]" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Document Selected</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Upload a document or select one from your library to start chatting.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/upload">
              <Button className="bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white gap-2">
                Upload Document
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/documents">
              <Button variant="outline">Browse Documents</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100dvh-4rem)] flex bg-background">
      {/* Chat sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 border-r border-border hidden md:block"
        >
          <ChatSidebar onNewChat={handleNewChat} />
        </motion.div>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hidden md:flex"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
            </Button>
            <FileText size={14} className="text-[hsl(158,64%,40%)]" />
            <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">
              {activeDoc?.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => setViewerOpen(!viewerOpen)}
          >
            <FileText size={14} />
            <span className="hidden sm:inline">{viewerOpen ? 'Hide' : 'View'} PDF</span>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
            {activeSession && activeSession.messages.length > 0 ? (
              <>
                {activeSession.messages.map((msg, i) => (
                  <ChatBubble key={msg.id} message={msg} index={i} />
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 items-center"
                  >
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-[8px] font-bold text-[hsl(158,64%,40%)]">AI</span>
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-xl bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] flex items-center justify-center mx-auto mb-4">
                  <FileText size={20} className="text-[hsl(158,64%,40%)]" />
                </div>
                <h3 className="text-base font-medium text-foreground mb-1">
                  Start a Conversation
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Ask questions about {activeDoc?.name}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['What is the main topic?', 'Summarize key points', 'What are the findings?'].map(q => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-3 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>

      {/* Document viewer */}
      {viewerOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 360, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="hidden lg:block flex-shrink-0"
        >
          <DocumentViewer onClose={() => setViewerOpen(false)} />
        </motion.div>
      )}
    </div>
  )
}
