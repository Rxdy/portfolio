import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchDailyStats, yesterday } from './umami.js'

const fetchMock = vi.fn()

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
  fetchMock.mockReset()
  process.env.UMAMI_WEBSITE_ID = 'site-1'
  process.env.UMAMI_ADMIN_USERNAME = 'admin'
  process.env.UMAMI_ADMIN_PASSWORD = 'secret'
})

afterEach(() => {
  vi.unstubAllGlobals()
  delete process.env.UMAMI_WEBSITE_ID
  delete process.env.UMAMI_ADMIN_USERNAME
  delete process.env.UMAMI_ADMIN_PASSWORD
  delete process.env.UMAMI_BASE_URL
})

function jsonResponse(body: unknown, ok = true, status = 200) {
  return { ok, status, json: async () => body }
}

describe('yesterday', () => {
  it('renvoie la veille de la date donnée', () => {
    const result = yesterday(new Date('2026-08-10T12:00:00Z'))
    expect(result.getDate()).toBe(9)
  })

  it("utilise 'maintenant' par défaut", () => {
    const before = Date.now()
    const result = yesterday()
    expect(result.getTime()).toBeLessThanOrEqual(before)
  })
})

describe('fetchDailyStats', () => {
  it('se connecte puis récupère stats, pages et provenances', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ token: 'tok-123' }))
      .mockResolvedValueOnce(jsonResponse({ visitors: { value: 12 }, pageviews: { value: 34 } }))
      .mockResolvedValueOnce(
        jsonResponse([
          { x: '/', y: 20 },
          { x: '/projets', y: 14 },
        ]),
      )
      .mockResolvedValueOnce(
        jsonResponse([
          { x: 'google.com', y: 8 },
          { x: null, y: 5 },
        ]),
      )

    const result = await fetchDailyStats(new Date('2026-08-10T12:00:00Z'))

    expect(result.visitors).toBe(12)
    expect(result.pageviews).toBe(34)
    expect(result.topPages).toEqual([
      { path: '/', views: 20 },
      { path: '/projets', views: 14 },
    ])
    expect(result.topReferrers).toEqual([
      { referrer: 'google.com', views: 8 },
      { referrer: '(direct)', views: 5 },
    ])

    const loginCall = fetchMock.mock.calls[0]
    expect(loginCall[0]).toBe('http://umami:3000/api/auth/login')
    expect(JSON.parse(loginCall[1].body)).toEqual({ username: 'admin', password: 'secret' })

    const statsCall = fetchMock.mock.calls[1]
    expect(statsCall[0]).toContain('/api/websites/site-1/stats?startAt=')
    expect(statsCall[1].headers.Authorization).toBe('Bearer tok-123')
  })

  it('respecte UMAMI_BASE_URL quand défini', async () => {
    process.env.UMAMI_BASE_URL = 'http://localhost:9999'
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ token: 'tok' }))
      .mockResolvedValueOnce(jsonResponse({ visitors: { value: 0 }, pageviews: { value: 0 } }))
      .mockResolvedValueOnce(jsonResponse([]))
      .mockResolvedValueOnce(jsonResponse([]))

    await fetchDailyStats(new Date())

    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:9999/api/auth/login')
  })

  it('limite les pages/provenances aux 5 premières', async () => {
    const many = Array.from({ length: 8 }, (_, i) => ({ x: `/page-${i}`, y: 8 - i }))
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ token: 'tok' }))
      .mockResolvedValueOnce(jsonResponse({ visitors: { value: 1 }, pageviews: { value: 1 } }))
      .mockResolvedValueOnce(jsonResponse(many))
      .mockResolvedValueOnce(jsonResponse(many))

    const result = await fetchDailyStats(new Date())

    expect(result.topPages).toHaveLength(5)
    expect(result.topReferrers).toHaveLength(5)
  })

  it('renvoie "(inconnue)" pour une page sans chemin', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ token: 'tok' }))
      .mockResolvedValueOnce(jsonResponse({ visitors: { value: 1 }, pageviews: { value: 1 } }))
      .mockResolvedValueOnce(jsonResponse([{ x: null, y: 3 }]))
      .mockResolvedValueOnce(jsonResponse([]))

    const result = await fetchDailyStats(new Date())

    expect(result.topPages).toEqual([{ path: '(inconnue)', views: 3 }])
  })

  it('lève une erreur explicite si la connexion échoue', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ error: 'nope' }, false, 401))

    await expect(fetchDailyStats(new Date())).rejects.toThrow('Umami login failed (401)')
  })

  it("lève une erreur explicite si une requête authentifiée échoue", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ token: 'tok' }))
      .mockResolvedValueOnce(jsonResponse({}, false, 500))
      .mockResolvedValueOnce(jsonResponse([]))
      .mockResolvedValueOnce(jsonResponse([]))

    await expect(fetchDailyStats(new Date())).rejects.toThrow('Umami request failed (500)')
  })
})
