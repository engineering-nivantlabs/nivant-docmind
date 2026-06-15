import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { mockTestimonials } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'

export default function Testimonials() {
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
            Loved by Thousands
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users are saying about DocuChat.
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-14"
        >
          {[
            { label: '10,000+', desc: 'Active Users' },
            { label: '500K+', desc: 'Documents Processed' },
            { label: '4.9/5', desc: 'Average Rating' },
            { label: '99.9%', desc: 'Uptime' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockTestimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <Card className="h-full border-border hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col h-full">
                  <Quote size={18} className="text-[hsl(158,64%,40%)] mb-3 opacity-50" />
                  <p className="text-sm text-foreground leading-relaxed flex-1">
                    {testimonial.text}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[hsl(158,64%,95%)] dark:bg-[hsl(158,64%,15%)] flex items-center justify-center text-xs font-bold text-[hsl(158,64%,40%)]">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 mt-2">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
