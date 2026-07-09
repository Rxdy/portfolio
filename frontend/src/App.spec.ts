import { describe, it, expect } from 'vitest'
import App from './App.vue'
import { mountWithRouter } from '@/test/router'

describe('App', () => {
  it('rend le header, le footer et la vue routée', async () => {
    const wrapper = await mountWithRouter(App)
    expect(wrapper.find('.site-header').exists()).toBe(true)
    expect(wrapper.find('.site-footer').exists()).toBe(true)
  })
})
