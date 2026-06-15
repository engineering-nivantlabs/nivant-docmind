import { motion } from 'framer-motion'
import { Check, FileText, Send } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Upload Your Document',
    description: 'Drag & drop any PDF or paste a URL. We support documents up to 500 pages.',
  },
  {
    number: '02',
    title: 'AI Processes Content',
    description: 'Our AI reads and understands your document in seconds, indexing all content.',
  },
  {
    number: '03',
    title: 'Start Chatting',
    description: 'Ask questions, request summaries, or extract insights with natural language.',
  },
]

export default function Demo() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers from your documents in three simple steps.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] flex items-center justify-center">
                  <span className="text-sm font-bold text-[hsl(158,64%,40%)]">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-4 flex flex-wrap gap-4">
              {['AI-powered analysis', 'Source citations', 'Multiple documents'].map(item => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Check size={14} className="text-[hsl(158,64%,40%)]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Demo mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-[hsl(158,64%,40%)]/10 to-transparent rounded-3xl blur-xl" />
              <div className="relative bg-white dark:bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                <div className="flex h-[380px]">
                  {/* Sidebar */}
                  <div className="hidden sm:flex w-48 border-r border-border bg-muted/30 flex-col">
                    <div className="p-3 border-b border-border">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[hsl(158,64%,40%)] text-white text-xs font-medium">
                        <FileText size={12} />
                        New Chat
                      </div>
                    </div>
                    <div className="p-2 space-y-1 flex-1">
                      {['Q3 Financial Analysis', 'ML Paper Deep Dive', 'Employee Benefits Q&A'].map(chat => (
                        <div key={chat} className="px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted cursor-pointer transition-colors truncate">
                          {chat}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Chat area */}
                  <div className="flex-1 flex flex-col">
                    <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center gap-2">
                      <FileText size={14} className="text-[hsl(158,64%,40%)]" />
                      <span className="text-xs font-medium">Q3_Financial_Report_2024.pdf</span>
                    </div>
                    <div className="flex-1 p-4 space-y-4 overflow-hidden">
                      <div className="flex justify-end">
                        <div className="bg-[hsl(158,64%,40%)] text-white rounded-2xl rounded-tr-sm px-3.5 py-2 text-xs max-w-[80%]">
                          What were the main expense categories?
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-[8px] font-bold text-[hsl(158,64%,40%)]">AI</span>
                        </div>
                        <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs max-w-[85%] space-y-1.5">
                          <p className="text-foreground">The main expense categories:</p>
                          <div className="space-y-0.5 text-muted-foreground">
                            <p>1. R&D — $3.2M (25.8%)</p>
                            <p>2. Sales & Marketing — $2.8M</p>
                            <p>3. G&A — $1.6M (12.9%)</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[hsl(158,64%,40%)] text-white rounded-2xl rounded-tr-sm px-3.5 py-2 text-xs max-w-[80%]">
                          Summarize the cash flow statement
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-[8px] font-bold text-[hsl(158,64%,40%)]">AI</span>
                        </div>
                        <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2 text-xs max-w-[85%]">
                          <span className="text-foreground">Net cash increase: +$0.1M. Ending balance: <strong>$8.7M</strong>. Strong operating cash flow of +$2.4M.</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-border">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted">
                        <span className="text-xs text-muted-foreground flex-1">Ask anything...</span>
                        <Send size={12} className="text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
