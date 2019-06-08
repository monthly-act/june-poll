import { shallowMount } from '@vue/test-utils';

import MenuButton from '@/components/molecules/MenuButton.vue';
import NavDrawer from '@/components/organisms/NavDrawer.vue';

import TitleBar from '@/components/organisms/TitleBar.vue';

describe('TitleBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TitleBar);
  });

  describe('rendering', () => {
    it('should hide NavDrawer by default', () => {
      expect(wrapper.find(NavDrawer).props('show')).toBe(false);
    });
  });
  describe('interaction', () => {
    it('should show NavDrawer when MenuButton is clicked', () => {
      wrapper.find(MenuButton).vm.$emit('click');

      expect(wrapper.find(NavDrawer).props('show')).toBe(true);
    });

    it('should show NavDrawer when MenuButton is clicked', () => {
      wrapper.find(NavDrawer).vm.$emit('close');

      expect(wrapper.find(NavDrawer).props('show')).toBe(false);
    });
  });
});
