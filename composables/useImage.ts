export const useImages = () => {
  const getImageUrl = (path: string) => {
    // 如果路径已经以/开头，直接返回
    if (path.startsWith('/')) {
      return path;
    }

    // 如果路径以~/public开头，移除~/public前缀
    if (path.startsWith('~/public/')) {
      return path.replace('~/public/', '/');
    }

    // 如果路径以@/public开头，移除@/public前缀
    if (path.startsWith('@/public/')) {
      return path.replace('@/public/', '/');
    }

    // 如果路径以public开头，移除public前缀
    if (path.startsWith('public/')) {
      return path.replace('public/', '/');
    }

    // 默认添加/前缀
    return `/${path}`;
  };

  return {
    getImageUrl,
  };
};
