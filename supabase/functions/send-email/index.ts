import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { MailService } from 'npm:@sendgrid/mail@8.1.3'

const TEMPLATE_ID = 'd-e434a34c9ae14ac1bdd019ed77150708'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const SENDGRID_SECRET_KEY = Deno.env.get('SENDGRID_SECRET_KEY')

  if (!SENDGRID_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Initialization error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }

  const sendgridClient = new MailService()
  sendgridClient.setApiKey(SENDGRID_SECRET_KEY)

  const emails: string[] = [
    'mjkellymayo@gmail.com',
    'ricardo.m.baptista.santos@gmail.com',
    'afonsojesus2011@hotmail.com',
    'cyan@whitepaperspolicy.org',
    'egonon.contact@protonmail.com',
    'latestnewsnow@hotmail.com',
    'raquelmanjuanunes@live.com.pt',
    'andrej119@yahoo.com',
    'restore1815@proton.me',
    'ellvlaardingerbroek@gmail.com',
    'ol.nema@email.cz',
    'joaonevesvisual@gmail.com',
    'Dnogas@gmail.com',
    'branko14@proton.me',
    'vincent.vos@fvd.nl',
    'egosumostium@mail.ru',
    'pedrodpfaria@hotmail.com',
    'tore.rasmussen81@gmail.com',
    'laurens.kd.lang@gmail.com',
    'brycek@protonmail.com',
    'ethanstallner@gmail.com',
    'psycarlo1@gmail.com',
    'gaetan.claeys7@gmail.com',
    'ritabaptistalaguna@icloud.com',
    'julijancgf@gmail.com',
    'eboulang@gmail.com',
    'dominikboehler@gmx.de',
    '77johnok@protonmail.com',
    'martin.msellner@gmail.com',
    'jelenapostuma@gmail.com',
    'robtop@seznam.cz',
    'dr.gebi@gmail.com',
    'coolelias@live.be',
    'benedikt.pemsel@gmail.com',
    'johnmcloughlinmd14@gmail.com',
    'martinezpolitix@proton.me',
    'nybo.jds@proton.me'
  ]

  try {
    await sendgridClient.send({
      from: 'remigrationsummit@gmail.com',
      to: emails,
      templateId: TEMPLATE_ID
    })
  } catch (error) {
    return new Response(error, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})
