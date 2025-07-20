import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ParcelTable from '../components/ParcelTable.vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'

const globalConfig = {
  plugins: [PrimeVue],
  directives: { tooltip: Tooltip }
}

describe('ParcelTable.vue', () => {
  it('shows empty message when no parcels', async () => {
    const wrapper = mount(ParcelTable, {
      props: { parcels: [], loading: false },
      global: globalConfig
    })

    expect(wrapper.text()).toContain('No parcels yet. Upload a file to start processing.')
  })

  it('passes loading prop to DataTable', async () => {
    const wrapper = mount(ParcelTable, {
      props: {
        parcels: [{ recipient: { name: 'Test', address: { city: 'Test' } }, weight: 1, value: 100, department: 'Mail' }],
        loading: true
      },
      global: globalConfig
    })

    // Assert DataTable gets loading=true prop
    const datatable = wrapper.findComponent({ name: 'DataTable' })
    expect(datatable.props('loading')).toBe(true)
  })

  it('emits delete event when delete button clicked', async () => {
    const wrapper = mount(ParcelTable, {
      props: {
        parcels: [{
          recipient: { name: 'Test', address: { city: 'Test City' } },
          weight: 2,
          value: 200,
          department: 'Mail'
        }],
        loading: false
      },
      global: globalConfig
    })
  
    await wrapper.vm.$nextTick()
  
    // Find button by icon class inside the button
    const deleteButton = wrapper.find('button .pi-trash')
  
    expect(deleteButton.exists()).toBe(true)
  
    await deleteButton.trigger('click')
  
    expect(wrapper.emitted('delete')).toBeTruthy()
  })
  
})  