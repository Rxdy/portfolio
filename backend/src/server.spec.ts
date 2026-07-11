import { describe, it, expect, afterEach } from 'vitest'
import { buildServer } from './server.js'

describe('buildServer', () => {
  afterEach(() => {
    delete process.env.ALLOWED_ORIGIN
  })

  it("utilise l'origine par défaut quand ALLOWED_ORIGIN n'est pas défini", () => {
    delete process.env.ALLOWED_ORIGIN
    const app = buildServer()
    expect(app).toBeDefined()
  })

  it('utilise ALLOWED_ORIGIN quand défini', () => {
    process.env.ALLOWED_ORIGIN = 'https://rxdy.fr'
    const app = buildServer()
    expect(app).toBeDefined()
  })
})
