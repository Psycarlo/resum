import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createClient } from 'jsr:@supabase/supabase-js@2'
import { MailService } from 'npm:@sendgrid/mail@8.1.3'
import { corsHeaders } from '../_shared/cors.ts'
import { isLocal } from '../_shared/environment.ts'

const PASSWORD = 'resum2025!remigration'
const TEMPLATE_ID = 'd-d8cbd561de384533abea5636c64c0fcf'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const SENDGRID_SECRET_KEY = Deno.env.get('SENDGRID_SECRET_KEY')
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!SENDGRID_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY)
    return new Response(
      JSON.stringify({ error: 'Missing environment variables' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  const ticketTypes = ['general', 'vip', 'premium']

  const { password, email, ticket } = await req.json()

  if (password !== PASSWORD)
    return new Response(JSON.stringify({ error: 'No permissions' }), {
      status: 401
    })

  if (!ticketTypes.includes(ticket))
    return new Response(JSON.stringify({ error: 'Invalid ticket type' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })

  const ticketCode = (Math.random() + 1).toString(36).substring(2).toUpperCase()
  const fullTicketCode = `RESUM25-${ticket.toUpperCase()}-${ticketCode}`
  const cost = 0

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  await supabase.from('manual_checkout_ticket_resum_25').insert({
    email,
    ticket_code: fullTicketCode
  })
  await supabase.from('tickets_resum_25').insert({
    checkout_id: 'manual',
    payment_method: 'manual',
    code: fullTicketCode,
    invoice_sent_at: new Date().toISOString()
  })

  const sendgridClient = new MailService()
  sendgridClient.setApiKey(SENDGRID_SECRET_KEY)

  const emails = [email]
  if (!isLocal()) emails.push('remigrationsummit@gmail.com')

  try {
    await sendgridClient.send({
      from: {
        email: 'contact@remigrationsummit.com',
        name: 'Remigration Summit'
      },
      to: emails,
      templateId: TEMPLATE_ID,
      dynamicTemplateData: {
        type: ticket.toUpperCase(),
        price: `${cost}€`,
        code: fullTicketCode
      }
    })
  } catch (error) {
    return new Response(error, { status: 400 })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})
