export default defineEventHandler((event) => {
  // 设置SSR相关的响应头
  setResponseHeaders(event, {
    'X-Render-Mode': 'SSR',
    'Cache-Control': 'public, max-age=300, s-maxage=600',
  });
});
