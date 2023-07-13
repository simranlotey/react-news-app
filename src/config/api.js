export const API_DOMAIN = "https://gnews.io/api/v4/top-headlines?country="
export const API_KEY = "549ab5bf1867e07059b00a64060ed62d"
export const endpointPath = (country, category) => `${API_DOMAIN}${country}&category=${category}&apikey=${API_KEY}`;

// f2eb478b0cdb5909364e59fdc321344f
// 4557db3db3b45e65e88c647db5d30499