import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProcessingLogs from '../components/ProcessingLogs.vue'

describe('ProcessingLogs.vue', () => {
  it('shows no logs message when logs are empty', () => {
    const wrapper = mount(ProcessingLogs, {
      props: { logs: [] }
    })
    expect(wrapper.text()).toContain('No logs yet')
  })

  it('renders logs when provided', () => {
    const wrapper = mount(ProcessingLogs, {
      props: { logs: ['[Mail] Handling parcel to John'] }
    })
    expect(wrapper.text()).toContain('Handling parcel to John')
  })
})
