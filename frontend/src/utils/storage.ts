export const getStoredUrls = (): string[] => {
  const urls = localStorage.getItem('shortenedUrls');
  return urls ? JSON.parse(urls) : [];
};

export const addStoredUrl = (url: string) => {
  const urls = getStoredUrls();
  urls.unshift(url); // insert at the begin of the array
  localStorage.setItem('shortenedUrls', JSON.stringify(urls.slice(0, 5))); // Keep last 5 only
};