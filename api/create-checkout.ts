import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 })

  const { priceId, userId } = await req.json()

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/pricing`,
    metadata: { userId },
  })

  return Response.json({ url: session.url })
}
