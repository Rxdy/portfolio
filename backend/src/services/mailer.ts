import nodemailer from 'nodemailer'

interface ContactPayload {
  name: string
  email: string
  message: string
}

// Serveur SMTP générique, configuré uniquement par variables d'environnement —
// pointera vers le futur serveur mail auto-hébergé de Rudy sur son nom de domaine.
function envOr(key: string, fallback: string): string {
  const value = process.env[key]
  if (value) {
    return value
  }
  return fallback
}

function createTransport() {
  const port = Number(envOr('SMTP_PORT', '587'))

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })
}

export async function sendContactEmail({ name, email, message }: ContactPayload): Promise<void> {
  const transport = createTransport()
  const from = envOr('SMTP_FROM', 'Portfolio rxdy.fr <no-reply@rxdy.fr>')
  const to = envOr('CONTACT_TO', 'rudyalvs@gmail.com')

  await transport.sendMail({
    from,
    to,
    replyTo: `${name} <${email}>`,
    subject: `Nouveau message de ${name} via rxdy.fr`,
    text: `${message}\n\n— ${name} (${email})`,
  })
}
