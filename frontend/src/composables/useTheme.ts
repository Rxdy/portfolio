import { ref } from 'vue'

type Theme = 'light' | 'dark'

function readInitial(): Theme {
  const current = document.documentElement.dataset.theme
  return current === 'light' || current === 'dark' ? current : 'dark'
}

// État partagé entre tous les composants (déclaré au niveau du module)
const theme = ref<Theme>(readInitial())

function apply(next: Theme) {
  theme.value = next
  document.documentElement.dataset.theme = next
  localStorage.setItem('theme', next)
}

export function useTheme() {
  function toggle() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggle }
}
