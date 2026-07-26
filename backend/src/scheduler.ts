import { fetchDailyStats, yesterday } from './services/umami.js'
import { sendStatsEmail } from './services/statsMailer.js'

const CHECK_INTERVAL_MS = 60 * 60 * 1000 // vérifie toutes les heures
const SEND_HOUR = 8 // heure locale (conteneur) à partir de laquelle on envoie

export interface SchedulerState {
  lastSentDay: string | null
}

const defaultState: SchedulerState = { lastSentDay: null }

/**
 * Envoie le résumé quotidien des visites (voir services/umami.ts) une fois
 * par jour, pas avant SEND_HOUR. Silencieux si UMAMI_WEBSITE_ID n'est pas
 * configuré, et n'interrompt jamais le serveur en cas d'échec d'envoi.
 */
export async function checkAndSendStats(
  now: Date = new Date(),
  state: SchedulerState = defaultState,
): Promise<{ sent: boolean }> {
  if (!process.env.UMAMI_WEBSITE_ID) return { sent: false }
  if (now.getHours() < SEND_HOUR) return { sent: false }

  const today = now.toISOString().slice(0, 10)
  if (state.lastSentDay === today) return { sent: false }

  try {
    const day = yesterday(now)
    const stats = await fetchDailyStats(day)
    await sendStatsEmail(stats, day)
    state.lastSentDay = today
    return { sent: true }
  } catch (err) {
    console.error('Échec de l’envoi du résumé de stats quotidien :', (err as Error).message)
    return { sent: false }
  }
}

/** Démarre la vérification périodique (toutes les heures par défaut). */
export function startStatsScheduler(intervalMs = CHECK_INTERVAL_MS): ReturnType<typeof setInterval> | null {
  if (!process.env.UMAMI_WEBSITE_ID) {
    return null
  }
  checkAndSendStats().catch(() => {})
  return setInterval(() => {
    checkAndSendStats().catch(() => {})
  }, intervalMs)
}
