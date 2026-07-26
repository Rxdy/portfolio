import { createTransport, envOr, escapeHtml } from './smtpTransport.js'
import type { UmamiStats } from './umami.js'

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function listText(items: string[]): string {
  return items.length ? items.map((item) => `  - ${item}`).join('\n') : '  (aucune donnée)'
}

function listHtml(items: string[]): string {
  return items.length
    ? `<ul style="margin: 4px 0; padding-left: 20px;">${items.join('')}</ul>`
    : '<p style="margin: 4px 0; color: #666;">Aucune donnée.</p>'
}

/** Envoie le résumé quotidien des visites du site (voir services/umami.ts). */
export async function sendStatsEmail(stats: UmamiStats, day: Date): Promise<void> {
  const transport = createTransport()
  const from = envOr('SMTP_FROM', 'Portfolio rxdy.fr <no-reply@rxdy.fr>')
  const to = envOr('STATS_EMAIL_TO', 'rudyalvs@gmail.com')
  const dateLabel = formatDate(day)

  const text = [
    `Résumé des visites de rxdy.fr — ${dateLabel}`,
    '',
    `Visiteurs : ${stats.visitors}`,
    `Pages vues : ${stats.pageviews}`,
    '',
    'Pages les plus vues :',
    listText(stats.topPages.map((p) => `${p.path} (${p.views})`)),
    '',
    'Provenance des visiteurs :',
    listText(stats.topReferrers.map((r) => `${r.referrer} (${r.views})`)),
  ].join('\n')

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="color: #1d488f; margin-bottom: 4px;">📊 rxdy.fr — ${dateLabel}</h2>
      <p style="margin: 4px 0;"><strong>Visiteurs :</strong> ${stats.visitors}</p>
      <p style="margin: 4px 0;"><strong>Pages vues :</strong> ${stats.pageviews}</p>
      <p style="margin: 16px 0 4px;"><strong>Pages les plus vues :</strong></p>
      ${listHtml(stats.topPages.map((p) => `<li>${escapeHtml(p.path)} — <strong>${p.views}</strong></li>`))}
      <p style="margin: 16px 0 4px;"><strong>Provenance des visiteurs :</strong></p>
      ${listHtml(stats.topReferrers.map((r) => `<li>${escapeHtml(r.referrer)} — <strong>${r.views}</strong></li>`))}
    </div>
  `

  await transport.sendMail({
    from,
    to,
    subject: `📊 rxdy.fr — ${stats.visitors} visiteur${stats.visitors > 1 ? 's' : ''} le ${dateLabel}`,
    text,
    html,
  })
}
