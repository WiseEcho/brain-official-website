/**
 * @description 用于适配移动端下的次级标题
 * @author FluffyChi-Xing
 */
import { getDeviceSize } from '~/plugins/mobile/adaptH1';
import { DeviceSizeEnum } from '~/plugins/mobile/adaptH1';

export default {
  mounted(el: any, binding: any) {
    const setFontSize = () => {
      const device = getDeviceSize();
      if (device === DeviceSizeEnum.PC) {
        el.style.fontSize = '1.5rem';
      } else {
        el.style.fontSize = binding.value || '1rem';
      }
    };

    setFontSize();
    window.addEventListener('resize', setFontSize);
    el.onResize = setFontSize;
  },
  unmounted(el: any) {
    window.removeEventListener('resize', el.onResize);
  },
};
