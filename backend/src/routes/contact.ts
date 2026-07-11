import type { FastifyInstance } from 'fastify'
import { sendContactEmail } from '../services/mailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactBody {
  name: string
  email: string
  message: string
}

const bodySchema = {
  type: 'object',
  required: ['name', 'email', 'message'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 200 },
    email: { type: 'string', minLength: 3, maxLength: 320 },
    message: { type: 'string', minLength: 10, maxLength: 5000 },
  },
}

export async function contactRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: ContactBody }>(
    '/api/contact',
    { schema: { body: bodySchema } },
    async (request, reply) => {
      const { name, email, message } = request.body

      if (!EMAIL_RE.test(email)) {
        return reply.status(400).send({ error: 'invalid_email' })
      }

      try {
        await sendContactEmail({ name, email, message })
      } catch (err) {
        app.log.error(err)
        return reply.status(502).send({ error: 'send_failed' })
      }

      return reply.status(200).send({ ok: true })
    },
  )
}
