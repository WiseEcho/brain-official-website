/**
 * @description 该命令用于隐藏一些在 768px 宽度下的元素
 * @author FluffyChi-Xing
 */

import { DeviceSizeEnum, getDeviceSize } from '~/plugins/mobile/adaptH1';

export default {
  mounted(el: any, binding: any) {
    const remove = () => {
      const device = getDeviceSize();
      if (device === DeviceSizeEnum.PC) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    };
    remove();
    window.addEventListener('resize', remove);
    el.onResize = remove;
  },

  unmounted(el: any) {
    window.removeEventListener('resize', el.onResize);
  },
};
