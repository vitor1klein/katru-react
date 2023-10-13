import axios from "axios";

const api = axios.create({
  baseURL: "https://portal-katru-backend-stg-45b34fb09c5c.herokuapp.com/api/v1/",
});

export default api;
