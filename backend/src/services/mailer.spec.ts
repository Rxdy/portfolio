import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMailMock = vi.fn()
vi.mock('nodemailer', () => ({
  default: { createTransport: vi.fn(() => ({ sendMail: sendMailMock })) },
}))

const { sendContactEmail } = await import('./mailer.js')

describe('sendContactEmail', () => {
  beforeEach(() => {
    sendMailMock.mockReset().mockResolvedValue(undefined)
  })

  it('envoie un email avec les bonnes informations', async () => {
    await sendContactEmail({ name: 'Ada', email: 'ada@example.com', message: 'Bonjour !' })

    expect(sendMailMock).toHaveBeenCalledOnce()
    const call = sendMailMock.mock.calls[0][0]
    expect(call.replyTo).toBe('Ada <ada@example.com>')
    expect(call.subject).toContain('Ada')
    expect(call.text).toContain('Bonjour !')
    expect(call.to).toBe('rudyalvs@gmail.com')
  })

  it('authentifie le transport SMTP quand SMTP_USER est défini', async () => {
    process.env.SMTP_USER = 'user@example.com'
    process.env.SMTP_PASS = 'secret'

    await sendContactEmail({ name: 'Ada', email: 'ada@example.com', message: 'Bonjour !' })

    delete process.env.SMTP_USER
    delete process.env.SMTP_PASS
    expect(sendMailMock).toHaveBeenCalledOnce()
  })

  it('utilise SMTP_PORT, SMTP_FROM et CONTACT_TO quand définis', async () => {
    process.env.SMTP_PORT = '2525'
    process.env.SMTP_FROM = 'Test <test@rxdy.fr>'
    process.env.CONTACT_TO = 'contact@rxdy.fr'

    await sendContactEmail({ name: 'Ada', email: 'ada@example.com', message: 'Bonjour !' })

    delete process.env.SMTP_PORT
    delete process.env.SMTP_FROM
    delete process.env.CONTACT_TO
    const call = sendMailMock.mock.calls[0][0]
    expect(call.from).toBe('Test <test@rxdy.fr>')
    expect(call.to).toBe('contact@rxdy.fr')
  })
})
