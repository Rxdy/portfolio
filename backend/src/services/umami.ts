export interface UmamiStats {
  visitors: number
  pageviews: number
  topPages: { path: string; views: number }[]
  topReferrers: { referrer: string; views: number }[]
}

interface UmamiLoginResponse {
  token: string
}

interface UmamiStatsResponse {
  visitors: { value: number }
  pageviews: { value: number }
}

interface UmamiMetric {
  x: string | null
  y: number
}

function baseUrl(): string {
  return process.env.UMAMI_BASE_URL || 'http://umami:3000'
}

async function login(): Promise<string> {
  const res = await fetch(`${baseUrl()}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.UMAMI_ADMIN_USERNAME,
      password: process.env.UMAMI_ADMIN_PASSWORD,
    }),
  })
  if (!res.ok) {
    throw new Error(`Umami login failed (${res.status})`)
  }
  const data = (await res.json()) as UmamiLoginResponse
  return data.token
}

async function authedGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    throw new Error(`Umami request failed (${res.status}): ${path}`)
  }
  return (await res.json()) as T
}

function dayRange(date: Date): { startAt: number; endAt: number } {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)
  return { startAt: start.getTime(), endAt: end.getTime() }
}

/** La veille du jour donné (par défaut : aujourd'hui) — le jour qu'on résume. */
export function yesterday(now: Date = new Date()): Date {
  const day = new Date(now)
  day.setDate(day.getDate() - 1)
  return day
}

/**
 * Statistiques de visite d'un jour donné (par défaut hier), via l'API Umami :
 * s'authentifie avec le compte admin (voir UMAMI_ADMIN_USERNAME/PASSWORD),
 * puis récupère le total de visiteurs/pages vues, les pages et les
 * provenances les plus fréquentes.
 */
export async function fetchDailyStats(day: Date = yesterday()): Promise<UmamiStats> {
  const websiteId = process.env.UMAMI_WEBSITE_ID
  const token = await login()
  const { startAt, endAt } = dayRange(day)
  const query = `startAt=${startAt}&endAt=${endAt}`

  const [stats, pages, referrers] = await Promise.all([
    authedGet<UmamiStatsResponse>(`/api/websites/${websiteId}/stats?${query}`, token),
    authedGet<UmamiMetric[]>(`/api/websites/${websiteId}/metrics?type=path&${query}`, token),
    authedGet<UmamiMetric[]>(`/api/websites/${websiteId}/metrics?type=referrer&${query}`, token),
  ])

  return {
    visitors: stats.visitors.value,
    pageviews: stats.pageviews.value,
    topPages: pages.slice(0, 5).map((item) => ({ path: item.x ?? '(inconnue)', views: item.y })),
    topReferrers: referrers.slice(0, 5).map((item) => ({ referrer: item.x || '(direct)', views: item.y })),
  }
}
