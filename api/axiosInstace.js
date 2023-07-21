import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.baseURL = "http://10.74.0.59:4000/api";

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
