import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendContactEmailMock = vi.fn()
vi.mock('../services/mailer.js', () => ({
  sendContactEmail: sendContactEmailMock,
}))

const { buildServer } = await import('../server.js')

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendContactEmailMock.mockReset().mockResolvedValue(undefined)
  })

  it('accepte une requête valide et envoie l’email', async () => {
    const app = buildServer()
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Ada', email: 'ada@example.com', message: 'Un message assez long.' },
    })

    expect(res.statusCode).toBe(200)
    expect(sendContactEmailMock).toHaveBeenCalledOnce()
  })

  it('rejette un email invalide (regex, après le schema)', async () => {
    const app = buildServer()
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Ada', email: 'pas-un-email', message: 'Un message assez long.' },
    })

    expect(res.statusCode).toBe(400)
    expect(sendContactEmailMock).not.toHaveBeenCalled()
  })

  it('rejette un message trop court (schema)', async () => {
    const app = buildServer()
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Ada', email: 'ada@example.com', message: 'court' },
    })

    expect(res.statusCode).toBe(400)
  })

  it('rejette un champ manquant (schema)', async () => {
    const app = buildServer()
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Ada', message: 'Un message assez long.' },
    })

    expect(res.statusCode).toBe(400)
  })

  it('renvoie 502 si l’envoi échoue', async () => {
    sendContactEmailMock.mockRejectedValueOnce(new Error('smtp down'))
    const app = buildServer()
    const res = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'Ada', email: 'ada@example.com', message: 'Un message assez long.' },
    })

    expect(res.statusCode).toBe(502)
  })
})
