/**
 *
 * @description 移动端适配相关自定义指令
 * v-mobile-h1: h1标签的适配 后面可以插入指定的字号，默认在移动端的字号为 1.5rem 在 pc 端为 3rem
 * v-mobile-h2: h2标签的适配 默认在移动端的字号为 1 rem 在 pc 端为 1.5rem
 */

export enum DeviceSizeEnum {
  PC = 1024,
  MOBILE = 768,
}

export function getDeviceSize() {
  if (process.client) {
    const width = window.innerWidth || 0;
    return width >= DeviceSizeEnum.PC
      ? DeviceSizeEnum.PC
      : DeviceSizeEnum.MOBILE;
  }
  // SSR 默认返回 PC
  return DeviceSizeEnum.PC;
}

export default {
  mounted(el: any, binding: any) {
    const setFontSize = () => {
      const device = getDeviceSize();
      if (device === DeviceSizeEnum.PC) {
        el.style.fontSize = '3rem';
      } else {
        el.style.fontSize = binding.value || '1.5rem';
      }
    };
    setFontSize();
    window.addEventListener('resize', setFontSize);
    el._onResize = setFontSize; // 方便卸载
  },
  unmounted(el: any) {
    window.removeEventListener('resize', el._onResize);
  },
};
