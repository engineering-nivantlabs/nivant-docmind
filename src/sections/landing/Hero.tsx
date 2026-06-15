import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-gradient-to-b from-[hsl(158,64%,97%)] to-background dark:from-[hsl(158,30%,8%)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] text-[hsl(158,64%,35%)] text-xs font-medium mb-6">
                <Sparkles size={12} />
                Powered by AI
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground"
            >
              Chat With{' '}
              <span className="text-[hsl(158,64%,40%)]">Any</span>{' '}
              Document
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Upload PDFs or paste URLs, then chat with AI to extract answers, summarize content, and analyze documents in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/upload">
                <Button size="lg" className="bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white gap-2 rounded-xl px-6 shadow-lg shadow-[hsl(158,64%,40%)]/20">
                  Upload a Document
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="rounded-xl px-6 gap-2">
                  Try Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex items-center gap-6"
            >
              {[
                { icon: Zap, label: 'Instant answers' },
                { icon: Shield, label: 'Secure & private' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon size={14} className="text-[hsl(158,64%,40%)]" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(158,64%,40%)]/20 to-[hsl(160,60%,45%)]/10 rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-white dark:bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                {/* Mock chat interface */}
                <div className="h-[420px] flex flex-col">
                  <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs text-muted-foreground font-medium">Q3_Financial_Report.pdf</span>
                  </div>
                  <div className="flex-1 p-4 space-y-4 bg-muted/20">
                    <div className="flex gap-2 justify-end">
                      <div className="bg-[hsl(158,64%,40%)] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%] text-sm shadow-sm">
                        What was our total revenue in Q3?
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Sparkles size={12} className="text-[hsl(158,64%,40%)]" />
                      </div>
                      <div className="bg-white dark:bg-card rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm shadow-sm border border-border">
                        <p className="text-foreground">Your total Q3 revenue was <strong className="text-[hsl(158,64%,40%)]">$12.4M</strong>, a 15.3% increase from Q2.</p>
                        <div className="mt-2 pt-2 border-t border-border flex gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(158,64%,95%)] text-[hsl(158,64%,35%)]">Page 3</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-[hsl(158,64%,40%)] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%] text-sm shadow-sm">
                        Summarize the expense breakdown
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Sparkles size={12} className="text-[hsl(158,64%,40%)]" />
                      </div>
                      <div className="bg-white dark:bg-card rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm shadow-sm border border-border">
                        <p className="text-foreground">Key expenses: R&D ($3.2M), S&M ($2.8M), G&A ($1.6M). Total operating expenses: <strong>$11.1M</strong>.</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-border bg-background">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-sm text-muted-foreground">
                      Ask anything about this document...
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
