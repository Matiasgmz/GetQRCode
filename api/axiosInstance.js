import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { API_URI } = process.env;
// console.log("api :" + API_URI);

axios.defaults.baseURL = API_URI;

const axiosInstance = axios;

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("qrcode-token");
    const auth = token ? `Bearer ${token}` : null;

    if (auth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance };
