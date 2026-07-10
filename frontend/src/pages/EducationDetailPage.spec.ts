import { describe, it, expect } from 'vitest'
import EducationDetailPage from './EducationDetailPage.vue'
import { mountWithRouter } from '@/test/router'

describe('EducationDetailPage', () => {
  it('regroupe écoles et entreprises', async () => {
    const wrapper = await mountWithRouter(EducationDetailPage)
    expect(wrapper.text()).toContain('Mes écoles')
    expect(wrapper.text()).toContain('Mes entreprises')
  })
})
