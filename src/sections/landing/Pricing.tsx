import { motion } from 'framer-motion'
import { Check, X, Sparkles } from 'lucide-react'
import { mockPricingPlans } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free, upgrade when you need more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {mockPricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <Card
                className={cn(
                  'relative h-full border-border transition-all duration-200',
                  plan.popular
                    ? 'border-[hsl(158,64%,40%)] shadow-lg shadow-[hsl(158,64%,40%)]/10 scale-[1.02]'
                    : 'hover:shadow-md'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[hsl(158,64%,40%)] text-white text-xs font-medium">
                      <Sparkles size={12} />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/{plan.period}</span>
                  </div>

                  <Button
                    className={cn(
                      'w-full mt-6 rounded-xl',
                      plan.popular
                        ? 'bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white'
                        : ''
                    )}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>

                  <div className="mt-6 space-y-3">
                    {plan.features.map(feature => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <Check size={14} className="text-[hsl(158,64%,40%)] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map(feature => (
                      <div key={feature} className="flex items-start gap-2.5 opacity-40">
                        <X size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
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
