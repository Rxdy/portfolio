import { config } from '@vue/test-utils'
import { i18n } from '@/i18n'

// i18n est un plugin global de l'app (voir main.ts) : on le fournit à chaque
// mount() de test, comme en prod, pour éviter de le répéter dans chaque spec.
config.global.plugins.push(i18n)
