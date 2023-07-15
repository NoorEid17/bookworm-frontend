import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/api",
  validateStatus(status) {
    return status < 500;
  },
});

export default axios;
