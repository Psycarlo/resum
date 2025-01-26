import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import Stripe from 'npm:stripe@16.9.0'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { MailService } from 'npm:@sendgrid/mail@8.1.3'
import { isLocal } from '../_shared/environment.ts'

const TEMPLATE_ID = 'd-d8cbd561de384533abea5636c64c0fcf'

Deno.serve(async (req) => {
  const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
  const STRIPE_CHECKOUT_WEBHOOK_SECRET = Deno.env.get(
    'STRIPE_CHECKOUT_WEBHOOK_SECRET'
  )

  if (!STRIPE_SECRET_KEY || !STRIPE_CHECKOUT_WEBHOOK_SECRET)
    return new Response(JSON.stringify({ error: 'Initialization error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })

  if (!req.headers.get('Stripe-Signature'))
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
    httpClient: Stripe.createFetchHttpClient()
  })
  const cryptoProvider = Stripe.createSubtleCryptoProvider()
  const body = await req.text()

  let event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      req.headers.get('stripe-signature')!,
      STRIPE_CHECKOUT_WEBHOOK_SECRET,
      undefined,
      cryptoProvider
    )
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }

  const checkoutSession = event.data.object as Stripe.Checkout.Session

  // ==========================
  // LOGIC FOR TICKETS RESUM 25
  // ==========================

  const SENDGRID_SECRET_KEY = Deno.env.get('SENDGRID_SECRET_KEY')
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!SENDGRID_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY)
    return new Response(JSON.stringify({ error: 'Initialization error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { data, error } = await supabase
    .from('stripe_checkout_ticket_resum_25')
    .select('*')
    .eq('stripe_checkout', checkoutSession.id)

  if (error || !data || !data[0]) {
    console.log(error, data)
    return new Response(JSON.stringify({ error: 'Checkout not found' }), {
      status: 400
    })
  }

  const ticketCode = (Math.random() + 1).toString(36).substring(2).toUpperCase()
  const ticketType = data[0]['type'] as string
  const fullTicketCode = `RESUM25-${ticketType.toUpperCase()}-${ticketCode}`
  const userEmail = data[0]['email']
  const cost = checkoutSession.amount_total
    ? checkoutSession.amount_total / 100
    : 0

  await supabase.from('tickets_resum_25').insert({
    checkout_id: checkoutSession.id,
    payment_method: 'stripe',
    code: fullTicketCode
  })

  const sendgridClient = new MailService()
  sendgridClient.setApiKey(SENDGRID_SECRET_KEY)

  const emails = [userEmail]
  if (!isLocal()) emails.push('remigrationsummit@gmail.com')

  try {
    await sendgridClient.send({
      from: 'remigrationsummit@gmail.com',
      to: emails,
      templateId: TEMPLATE_ID,
      dynamicTemplateData: {
        type: ticketType.toUpperCase(),
        price: `${cost}€`,
        code: fullTicketCode
      }
    })

    await supabase
      .from('tickets_resum_25')
      .update({
        invoice_sent_at: new Date().toISOString()
      })
      .eq('checkout_id', checkoutSession.id)
  } catch (error) {
    return new Response(error, { status: 400 })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})
