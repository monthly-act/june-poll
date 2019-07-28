import { shallowMount } from '@vue/test-utils';

import RoundButton from '@/components/atoms/AButton.vue';

describe('RoundButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RoundButton, {
      propsData: {
        text: 'JOIN',
      },
    });
  });

  describe('rendering', () => {
    it('should show text from props', () => {
      expect(wrapper.find('.btn-wrapper').text()).toBe('JOIN');
    });
  });

  describe('interactions', () => {
    it('should emit click event when button is clicked', () => {
      wrapper.find('.btn-wrapper').trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('should not emit any event when button is disabled', () => {
      wrapper.setProps({ disabled: true });
      wrapper.find('.btn-wrapper').trigger('click');

      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });
});
