export const API_DOMAIN = "https://newsapi.org/v2/top-headlines?country="
export const API_KEY = "6517c7f12e7140328cc1277ec3ed050a"
export const endpointPath = (country, category, page, pageSize) => `${API_DOMAIN}${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
