import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { SchedulerState } from './scheduler.js'

const fetchDailyStatsMock = vi.fn()
const yesterdayMock = vi.fn((now: Date) => new Date(now.getTime() - 86_400_000))
const sendStatsEmailMock = vi.fn()

vi.mock('./services/umami.js', () => ({
  fetchDailyStats: (...args: unknown[]) => fetchDailyStatsMock(...args),
  yesterday: (...args: [Date]) => yesterdayMock(...args),
}))
vi.mock('./services/statsMailer.js', () => ({
  sendStatsEmail: (...args: unknown[]) => sendStatsEmailMock(...args),
}))

const { checkAndSendStats, startStatsScheduler } = await import('./scheduler.js')

function freshState(): SchedulerState {
  return { lastSentDay: null }
}

beforeEach(() => {
  fetchDailyStatsMock.mockReset().mockResolvedValue({ visitors: 1, pageviews: 1, topPages: [], topReferrers: [] })
  sendStatsEmailMock.mockReset().mockResolvedValue(undefined)
  process.env.UMAMI_WEBSITE_ID = 'site-1'
})

afterEach(() => {
  delete process.env.UMAMI_WEBSITE_ID
  vi.useRealTimers()
})

describe('checkAndSendStats', () => {
  it("ne fait rien si UMAMI_WEBSITE_ID n'est pas configuré", async () => {
    delete process.env.UMAMI_WEBSITE_ID
    const result = await checkAndSendStats(new Date('2026-08-10T09:00:00'), freshState())
    expect(result.sent).toBe(false)
    expect(sendStatsEmailMock).not.toHaveBeenCalled()
  })

  it("ne fait rien avant l'heure d'envoi", async () => {
    const result = await checkAndSendStats(new Date('2026-08-10T07:00:00'), freshState())
    expect(result.sent).toBe(false)
    expect(sendStatsEmailMock).not.toHaveBeenCalled()
  })

  it("envoie le résumé une fois l'heure atteinte", async () => {
    const state = freshState()
    const result = await checkAndSendStats(new Date('2026-08-10T09:00:00'), state)
    expect(result.sent).toBe(true)
    expect(fetchDailyStatsMock).toHaveBeenCalledOnce()
    expect(sendStatsEmailMock).toHaveBeenCalledOnce()
    expect(state.lastSentDay).toBe('2026-08-10')
  })

  it('ne renvoie pas deux fois le même jour', async () => {
    const state = freshState()
    await checkAndSendStats(new Date('2026-08-10T09:00:00'), state)
    const second = await checkAndSendStats(new Date('2026-08-10T15:00:00'), state)

    expect(second.sent).toBe(false)
    expect(sendStatsEmailMock).toHaveBeenCalledOnce()
  })

  it('renvoie le lendemain', async () => {
    const state = freshState()
    await checkAndSendStats(new Date('2026-08-10T09:00:00'), state)
    const nextDay = await checkAndSendStats(new Date('2026-08-11T09:00:00'), state)

    expect(nextDay.sent).toBe(true)
    expect(sendStatsEmailMock).toHaveBeenCalledTimes(2)
  })

  it("survit à un échec sans planter, et réessaiera plus tard", async () => {
    fetchDailyStatsMock.mockRejectedValueOnce(new Error('Umami down'))
    const state = freshState()

    const result = await checkAndSendStats(new Date('2026-08-10T09:00:00'), state)

    expect(result.sent).toBe(false)
    expect(state.lastSentDay).toBeNull()
  })
})

describe('startStatsScheduler', () => {
  it("renvoie null si UMAMI_WEBSITE_ID n'est pas configuré", () => {
    delete process.env.UMAMI_WEBSITE_ID
    expect(startStatsScheduler()).toBeNull()
  })

  it('démarre une vérification immédiate puis une toutes les intervalMs', async () => {
    vi.useFakeTimers()
    const handle = startStatsScheduler(1000)
    expect(handle).not.toBeNull()
    await vi.advanceTimersByTimeAsync(0) // laisse la vérification immédiate se résoudre

    fetchDailyStatsMock.mockClear()
    await vi.advanceTimersByTimeAsync(1000) // déclenche le setInterval
    expect(fetchDailyStatsMock).not.toHaveBeenCalled() // il n'est que 0h par défaut dans les fake timers

    clearInterval(handle!)
  })
})
