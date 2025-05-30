import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { MailService } from 'npm:@sendgrid/mail@8.1.3'

const PASSWORD = 'resum2025!remigration'
const TEMPLATE_ID = 'd-58d0ddd5c9204e309aa08fe696018049'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const SENDGRID_SECRET_KEY = Deno.env.get('SENDGRID_SECRET_KEY')
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!SENDGRID_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Initialization error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }

  const { password } = await req.json()

  if (password !== PASSWORD)
    return new Response(JSON.stringify({ error: 'No permissions' }), {
      status: 401
    })

  const sendgridClient = new MailService()
  sendgridClient.setApiKey(SENDGRID_SECRET_KEY)

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { data: tickets } = await supabase.from('tickets_resum_25').select('*')
  const { data: manualCheckouts } = await supabase
    .from('manual_checkout_ticket_resum_25')
    .select('*')
  const { data: stripeCheckouts } = await supabase
    .from('stripe_checkout_ticket_resum_25')
    .select('*')

  type Ticket = {
    id: number
    checkout_id: string
    payment_method: 'manual' | 'stripe'
    code: string
    created_at: string
    used_at: string | null
    qr_code_sent_at: string | null
    invoice_sent_at: string | null
  }

  type FinalTicket = Ticket & { email: string }
  type ManualCheckout = { email: string; ticket_code: string }
  type StripeCheckout = { email: string; stripe_checkout: string }

  const typedManualCheckouts = manualCheckouts as ManualCheckout[]
  const typedStripeCheckouts = stripeCheckouts as StripeCheckout[]

  const finalTickets: FinalTicket[] = []
  let amount = 0

  if (tickets && tickets.length > 0) {
    for (const ticket of tickets) {
      const typedTicket = ticket as Ticket
      let finalTicket: FinalTicket | undefined

      if (typedTicket.qr_code_sent_at) continue
      if (typedTicket.used_at) continue

      amount += 1

      if (typedTicket.payment_method === 'manual') {
        const email = typedManualCheckouts.find(
          (checkout) => checkout.ticket_code === typedTicket.code
        )?.email
        if (email) finalTicket = { ...typedTicket, email }
      }

      if (typedTicket.payment_method === 'stripe') {
        const email = typedStripeCheckouts.find(
          (checkout) => checkout.stripe_checkout === typedTicket.checkout_id
        )?.email
        if (email) finalTicket = { ...typedTicket, email }
      }

      if (finalTicket) finalTickets.push(finalTicket)
    }
  }

  const distinctEmails = [
    ...new Set(finalTickets.map((ticket) => ticket.email))
  ]

  const emails: string[] = distinctEmails

  for (const email of emails) {
    try {
      await sendgridClient.send({
        from: {
          email: 'contact@remigrationsummit.com',
          name: 'Remigration Summit'
        },
        to: email,
        // bcc: emails,
        templateId: TEMPLATE_ID
      })
    } catch (error) {
      return new Response(error, {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      })
    }
  }

  return new Response(
    JSON.stringify({ ok: true, to: emails, amount: distinctEmails.length }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
})
