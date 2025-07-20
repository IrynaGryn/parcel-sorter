import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ParcelActions from '../components/ParcelActions.vue'
import { useParcelStore } from '../stores/parcelStore'

describe('ParcelActions.vue', () => {
  it('emits reset when Reset button is clicked', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const wrapper = mount(ParcelActions, {
      global: { plugins: [pinia] }
    })

    const store = useParcelStore()
    store.parcels = [{
      recipient: {
        name: 'John Doe',
        address: {
          street: 'Main St',
          houseNumber: '123',
          postalCode: '12345',
          city: 'Sample City'
        }
      },
      weight: 1.5,
      value: 100
    }] // ✅ Ensure button is enabled

    await wrapper.vm.$nextTick() // ✅ Wait for reactive updates

    const resetButton = wrapper.findAll('button')[0]
    expect(resetButton.exists()).toBe(true)

    await resetButton.trigger('click')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  it('emits reprocess when Re-Process button is clicked', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const wrapper = mount(ParcelActions, {
      global: { plugins: [pinia] }
    })

    const reprocessButton = wrapper.findAll('button')[1]
    expect(reprocessButton.exists()).toBe(true)

    await reprocessButton.trigger('click')
    expect(wrapper.emitted('reprocess')).toBeTruthy()
  })
})
