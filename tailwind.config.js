/** @type {import('tailwindcss').Config} */
/*
 * 静态化构建配置（2026-07-14 由 12 个 HTML 页面内联 tailwind.config 合并而来，内容一致）。
 * 重新生成命令：
 *   npx -y tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.input.css -o css/tailwind.css --minify
 * 修改任何 HTML 的 class 后需重新运行上述命令。
 */
module.exports = {
  content: ["./*.html", "./docs/*.html", "./js/main.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
      },
    },
  },
  plugins: [],
};
