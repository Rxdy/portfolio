import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { contactRoute } from './routes/contact.js'
import { startStatsScheduler } from './scheduler.js'

export function buildServer() {
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? 'http://localhost:5173'
  const app = Fastify({ logger: true })

  app.register(helmet)
  app.register(cors, { origin: allowedOrigin })
  // Anti-abus : le formulaire de contact n'a aucune raison d'être appelé souvent.
  app.register(rateLimit, { max: 5, timeWindow: '10 minutes' })
  app.register(contactRoute)

  return app
}

/* c8 ignore start -- démarrage réseau réel, non exécuté sous test (NODE_ENV=test) */
if (process.env.NODE_ENV !== 'test') {
  const PORT = Number(process.env.PORT ?? 3000)
  const app = buildServer()
  app.listen({ port: PORT, host: '0.0.0.0' }).catch((err) => {
    app.log.error(err)
    process.exit(1)
  })
  startStatsScheduler()
}
/* c8 ignore stop */
