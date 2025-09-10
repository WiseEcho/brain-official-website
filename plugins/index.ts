/**
 * @description 这个文件定义了一批用于处理移动端适配的自定义 directives
 * @author FluffyChi-Xing
 */

import adaptH1 from '~/plugins/mobile/adaptH1';
import adaptH2 from '~/plugins/mobile/adaptH2';
import hidden from '~/plugins/mobile/hidden';
import adaptH3 from '~/plugins/mobile/adaptH3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('h1', adaptH1);
  nuxtApp.vueApp.directive('h2', adaptH2);
  nuxtApp.vueApp.directive('h3', adaptH3);
  nuxtApp.vueApp.directive('hidden', hidden);
});
