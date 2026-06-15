import { motion } from 'framer-motion'
import { Upload, MessageSquare, BarChart3, Lock, FileSearch, Zap, Globe, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Upload,
    title: 'PDF Upload',
    description: 'Drag and drop any PDF document. Supports files up to 500 pages with instant processing.',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  },
  {
    icon: Globe,
    title: 'URL Parsing',
    description: 'Paste any URL to fetch and analyze web content, articles, and online documents.',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  },
  {
    icon: MessageSquare,
    title: 'AI Q&A',
    description: 'Ask natural language questions and get precise answers with source citations.',
    color: 'bg-[hsl(158,64%,95%)] text-[hsl(158,64%,35%)] dark:bg-[hsl(158,64%,15%)] dark:text-[hsl(158,64%,60%)]',
  },
  {
    icon: FileSearch,
    title: 'Summarization',
    description: 'Get concise summaries of any document, from research papers to financial reports.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  },
  {
    icon: BarChart3,
    title: 'Deep Analysis',
    description: 'Extract key insights, trends, and patterns from your documents automatically.',
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  },
  {
    icon: Lock,
    title: 'Private & Secure',
    description: 'Your documents are encrypted and never shared. Full control over your data.',
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Documents are processed in seconds. No waiting, no queues, just results.',
    color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
  },
  {
    icon: Clock,
    title: 'Chat History',
    description: 'All conversations are saved. Pick up where you left off with any document.',
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you extract maximum value from your documents.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
                <CardContent className="p-5">
                  <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon size={20} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
