import { describe, it, expect } from 'vitest'
import { router } from './index'

describe('router', () => {
  it('déclare les routes attendues', () => {
    const names = router.getRoutes().map((r) => r.name)
    expect(names).toEqual(
      expect.arrayContaining(['home', 'skills', 'education-detail', 'journey']),
    )
  })

  it('gère le scrollBehavior avec et sans ancre', () => {
    const sb = router.options.scrollBehavior as (to: unknown, from: unknown, saved: unknown) => unknown
    expect(sb({ hash: '#about' }, {}, null)).toMatchObject({ el: '#about' })
    expect(sb({ hash: '' }, {}, null)).toMatchObject({ top: 0 })
  })

  it('charge les composants lazy des routes', async () => {
    const lazy = router.options.routes.filter((r) => typeof r.component === 'function')
    expect(lazy.length).toBeGreaterThan(0)
    for (const r of lazy) {
      const loader = r.component as () => Promise<unknown>
      await expect(loader()).resolves.toBeTruthy()
    }
  })
})
