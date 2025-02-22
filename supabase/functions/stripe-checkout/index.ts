import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import Stripe from 'npm:stripe@16.9.0'
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { type, email, fullName } = await req.json()

  const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
  const WEBSITE_URL = Deno.env.get('WEBSITE_URL')
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (
    !STRIPE_SECRET_KEY ||
    !SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !WEBSITE_URL ||
    (type !== 'general' && type !== 'vip' && type !== 'premium') ||
    !email ||
    typeof email !== 'string' ||
    !fullName ||
    typeof fullName !== 'string'
  )
    return new Response(JSON.stringify({ error: 'Erro ao inicializar' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20'
  })

  const ticketAmount =
    type === 'general' ? 40 * 100 : type === 'vip' ? 100 * 100 : 250 * 100
  const ticketName =
    type === 'general'
      ? 'Remigration Summit 2025 | General Ticket'
      : type === 'vip'
        ? 'Remigration Summit 2025 | VIP Ticket'
        : 'Remigration Summit 2025 | PREMIUM Ticket'

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    cancel_url: `${WEBSITE_URL}?s=cancel`,
    success_url: `${WEBSITE_URL}?s=success`,
    locale: 'en',
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: ticketAmount,
          product_data: {
            name: ticketName
          }
        }
      }
    ]
  })

  await supabase.from('stripe_checkout_ticket_resum_25').insert({
    stripe_checkout: session.id,
    email,
    full_name: fullName,
    type
  })

  return new Response(JSON.stringify({ session: session.id }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})
