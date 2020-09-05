import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
  },
});

export default axiosInstance;
