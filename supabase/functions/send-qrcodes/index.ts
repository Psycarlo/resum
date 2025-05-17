import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createClient } from 'jsr:@supabase/supabase-js@2'
import { MailService } from 'npm:@sendgrid/mail@8.1.3'
import QRCode from 'npm:qrcode'
import { corsHeaders } from '../_shared/cors.ts'

const PASSWORD = 'resum2025!remigration'
const TEMPLATE_ID = 'd-6d45cce525cc4068ba56a3334bb65eda'

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

  let sentTo = 0

  for (const ticket of finalTickets) {
    try {
      const qrcodeBase64 = await QRCode.toDataURL(ticket.code)
      const pngImageData = qrcodeBase64.split(',')[1] as string

      await sendgridClient.send({
        from: {
          email: 'contact@remigrationsummit.com',
          name: 'Remigration Summit'
        },
        to: ticket.email,
        // bcc: emails,
        templateId: TEMPLATE_ID,
        attachments: [
          {
            content: pngImageData,
            filename: 'ticket.png',
            type: 'image/png',
            disposition: 'attachment'
          }
        ]
      })

      await supabase
        .from('tickets_resum_25')
        .update({ qr_code_sent_at: new Date().toISOString() })
        .eq('code', ticket.code)

      sentTo = sentTo + 1
    } catch (error) {
      return new Response(JSON.stringify({ error, ticket: ticket.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      })
    }
  }

  return new Response(JSON.stringify({ ok: true, amount, sentTo }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})
