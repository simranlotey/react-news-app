export const navbarBrand = "News App";
export const header = (category) => `News - Top ${category} Headlines`;
export const navs = [
    { nav: "Home", page: "/" },
    { nav: "General", page: "/general" },
    { nav: "Business", page: "/business" },
    { nav: "Sports", page: "/sports" },
    { nav: "Science", page: "/science" },
    { nav: "Health", page: "/health" },
    { nav: "Entertainment", page: "/entertainment" },
    { nav: "Technology", page: "/technology" }
]

export const router = [
    { path: "/", key: "general", category: "general", country: "us" },
    { path: "/general", key: "general", category: "general", country: "us" },
    { path: "/business", key: "business", category: "business", country: "us" },
    { path: "/sports", key: "sports", category: "sports", country: "us" },
    { path: "/science", key: "science", category: "science", country: "us" },
    { path: "/health", key: "health", category: "health", country: "us" },
    { path: "/entertainment", key: "entertainment", category: "entertainment", country: "us" },
    { path: "/technology", key: "technology", category: "technology", country: "us" }
]

export const summary = "Author, Channel and Date";
export const author = (author) => `Author: ${!author ? "Unknown" : author}`;
export const channel = (channel) => `Channel: ${channel}`;
export const lastUpdate = (date) => `Last updated: ${new Date(date).toGMTString()}`;
