import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('reprend le thème déjà posé sur <html> au chargement', async () => {
    document.documentElement.dataset.theme = 'light'
    vi.resetModules()
    const mod = await import('./useTheme')
    expect(mod.useTheme().theme.value).toBe('light')
    document.documentElement.dataset.theme = ''
  })

  it('bascule le thème et met à jour <html> + localStorage', () => {
    const { theme, toggle } = useTheme()
    const start = theme.value

    toggle()
    const next = start === 'dark' ? 'light' : 'dark'
    expect(theme.value).toBe(next)
    expect(document.documentElement.dataset.theme).toBe(next)
    expect(localStorage.getItem('theme')).toBe(next)

    toggle()
    expect(theme.value).toBe(start)
    expect(document.documentElement.dataset.theme).toBe(start)
  })

  it('partage le même état entre plusieurs appels', () => {
    const a = useTheme()
    const b = useTheme()
    const before = a.theme.value
    a.toggle()
    expect(b.theme.value).not.toBe(before)
    expect(b.theme.value).toBe(a.theme.value)
  })
})
