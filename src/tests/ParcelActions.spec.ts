import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ParcelActions from '../components/ParcelActions.vue'

describe('ParcelActions.vue', () => {
  it('emits reset when Reset button is clicked', async () => {
    const wrapper = mount(ParcelActions)
    await wrapper.find('button:first-child').trigger('click')
    expect(wrapper.emitted().reset).toBeTruthy()
  })

  it('emits reprocess when Re-Process button is clicked', async () => {
    const wrapper = mount(ParcelActions)
    await wrapper.find('button:last-child').trigger('click')
    expect(wrapper.emitted().reprocess).toBeTruthy()
  })
})
