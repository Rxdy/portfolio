import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { UmamiStats } from './umami.js'

const sendMailMock = vi.fn()
vi.mock('nodemailer', () => ({
  default: { createTransport: vi.fn(() => ({ sendMail: sendMailMock })) },
}))

const { sendStatsEmail } = await import('./statsMailer.js')

const day = new Date('2026-08-10T12:00:00Z')

const statsWithData: UmamiStats = {
  visitors: 12,
  pageviews: 34,
  topPages: [{ path: '/', views: 20 }],
  topReferrers: [{ referrer: 'google.com', views: 8 }],
}

const emptyStats: UmamiStats = {
  visitors: 1,
  pageviews: 1,
  topPages: [],
  topReferrers: [],
}

describe('sendStatsEmail', () => {
  beforeEach(() => {
    sendMailMock.mockReset().mockResolvedValue(undefined)
  })

  it('envoie un résumé avec les pages et provenances', async () => {
    await sendStatsEmail(statsWithData, day)

    expect(sendMailMock).toHaveBeenCalledOnce()
    const call = sendMailMock.mock.calls[0][0]
    expect(call.to).toBe('rudyalvs@gmail.com')
    expect(call.subject).toContain('12 visiteurs')
    expect(call.text).toContain('Visiteurs : 12')
    expect(call.text).toContain('/ (20)')
    expect(call.text).toContain('google.com (8)')
    expect(call.html).toContain('<li>/ — <strong>20</strong></li>')
  })

  it('utilise le singulier pour un seul visiteur', async () => {
    await sendStatsEmail({ ...statsWithData, visitors: 1 }, day)

    const call = sendMailMock.mock.calls[0][0]
    expect(call.subject).toContain('1 visiteur ')
  })

  it("indique l'absence de données quand il n'y a ni page ni provenance", async () => {
    await sendStatsEmail(emptyStats, day)

    const call = sendMailMock.mock.calls[0][0]
    expect(call.text).toContain('(aucune donnée)')
    expect(call.html).toContain('Aucune donnée.')
  })

  it('utilise STATS_EMAIL_TO et SMTP_FROM quand définis', async () => {
    process.env.STATS_EMAIL_TO = 'stats@rxdy.fr'
    process.env.SMTP_FROM = 'Test <test@rxdy.fr>'

    await sendStatsEmail(statsWithData, day)

    delete process.env.STATS_EMAIL_TO
    delete process.env.SMTP_FROM
    const call = sendMailMock.mock.calls[0][0]
    expect(call.to).toBe('stats@rxdy.fr')
    expect(call.from).toBe('Test <test@rxdy.fr>')
  })
})
