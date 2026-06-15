import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export default async function handler(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!
  
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response("Invalid signature", { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (userId) {
        await supabase.from("profiles").update({
          plan: "pro",
          stripe_customer_id: session.customer as string,
        }).eq("id", userId)
      }
      break
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string
      await supabase.from("profiles").update({ plan: "free" }).eq("stripe_customer_id", customerId)
      break
    }
  }

  return Response.json({ received: true })
}
