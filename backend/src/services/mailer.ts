import { createTransport, envOr, escapeHtml } from './smtpTransport.js'

interface ContactPayload {
  name: string
  email: string
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactPayload): Promise<void> {
  const transport = createTransport()
  const from = envOr('SMTP_FROM', 'Portfolio rxdy.fr <no-reply@rxdy.fr>')
  const to = envOr('CONTACT_TO', 'rudyalvs@gmail.com')

  const text = [
    'Nouveau message depuis le formulaire de contact de rxdy.fr',
    '',
    `Nom : ${name}`,
    `Email : ${email}`,
    '',
    'Message :',
    message,
  ].join('\n')

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="color: #1d488f; margin-bottom: 4px;">Nouveau message — rxdy.fr</h2>
      <p style="margin: 4px 0;"><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p style="margin: 4px 0;"><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p style="margin: 16px 0 4px;"><strong>Message :</strong></p>
      <p style="white-space: pre-wrap; border-left: 3px solid #6c8cff; padding-left: 12px; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `

  await transport.sendMail({
    from,
    to,
    replyTo: `${name} <${email}>`,
    subject: `Nouveau message de ${name} via rxdy.fr`,
    text,
    html,
  })
}
