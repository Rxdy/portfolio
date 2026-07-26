import nodemailer from 'nodemailer'

// Serveur SMTP générique, configuré uniquement par variables d'environnement —
// aujourd'hui le SMTP de Gmail, remplaçable par n'importe quel autre fournisseur.
// Partagé entre mailer.ts (formulaire de contact) et statsMailer.ts (résumé
// quotidien des visites).
export function envOr(key: string, fallback: string): string {
  const value = process.env[key]
  /* c8 ignore next */
  return value || fallback
}

export function createTransport() {
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

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
