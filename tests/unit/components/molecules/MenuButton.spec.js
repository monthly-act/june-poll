import { shallowMount } from '@vue/test-utils';
import MenuButton from '@/components/molecules/MenuButton.vue';

describe('MenuButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MenuButton);
  });

  describe('interactions', () => {
    it('should ', () => {
      wrapper.find('button').vm.$emit('click');

      expect(wrapper.emitted('click')).toBeTruthy();
    });
  });
});
