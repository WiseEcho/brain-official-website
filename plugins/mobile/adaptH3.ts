/**
 * @description 用于适配再次一级的文字内容，默认 pc端 1.0rem, 移动端默认 0.5rem
 */

import { DeviceSizeEnum, getDeviceSize } from '~/plugins/mobile/adaptH1';

export default {
  mounted(el: any, binding: any) {
    const setFontSize = () => {
      const device = getDeviceSize();
      if (device === DeviceSizeEnum.PC) {
        el.style.fontSize = '1rem';
      } else {
        el.style.fontSize = binding.value || '0.5rem';
      }
    };

    setFontSize();
    window.addEventListener('resize', setFontSize);
    el._onResize = setFontSize;
  },
  unmounted(el: any) {
    window.removeEventListener('resize', el._onResize);
  },
};
