import { describe, it, expect } from 'vitest'
import { computeAge } from './profile'

describe('computeAge', () => {
  const birth = new Date(1997, 4, 12) // 12 mai 1997

  it("décrémente quand le mois d'anniversaire n'est pas encore atteint", () => {
    const today = new Date(2026, 2, 1) // mars : avant mai
    expect(computeAge(birth, today)).toBe(28)
  })

  it("décrémente quand on est dans le mois d'anniversaire mais avant le jour", () => {
    const today = new Date(2026, 4, 5) // mai, avant le 12
    expect(computeAge(birth, today)).toBe(28)
  })

  it('ne décrémente pas le jour de l’anniversaire', () => {
    const today = new Date(2026, 4, 12) // 12 mai pile
    expect(computeAge(birth, today)).toBe(29)
  })

  it("ne décrémente pas après le mois d'anniversaire", () => {
    const today = new Date(2026, 6, 9) // juillet : après mai
    expect(computeAge(birth, today)).toBe(29)
  })
})
