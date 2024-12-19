import axios from "axios";

// const a =  import.meta.env.MODE === "development" ? "https://ping-buddy.vercel.app" : "/v1/api"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? `${import.meta.env.VITE_BASE_URL}/v1/api` : "/v1/api",
  // withCredentials: true,
});
