export default defineNuxtRouteMiddleware((to, from) => {
  // 在SSR环境下确保路由正确
  // if (process.server) {
  //   console.log('SSR Route middleware - to:', to.name, 'from:', from?.name);
  // }

  // 如果访问根路径，重定向到home
  // if (to.path === '/') {
  //   return navigateTo('/home');
  // }
});
