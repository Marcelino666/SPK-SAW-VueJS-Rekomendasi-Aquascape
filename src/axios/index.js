import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
axios.defaults.headers.post["Authorization"] =
  "Bearer " + localStorage.getItem("token");
// axios.defaults.headers = {
//   "Cache-Control": "no-cache",
//   Pragma: "no-cache",
//   Expires: "0",
// };
