import { shallowMount } from '@vue/test-utils'
import Logo from '@/components/Logo/index.tsx'

describe('Logo.tsx', () => {
  it('renders props.collapsed when passed', () => {
    const wrapper = shallowMount(Logo, {
      props: { collapsed: true }
    })
    expect(wrapper.find('.logo__title').exists()).toBeFalsy()
  })
})
