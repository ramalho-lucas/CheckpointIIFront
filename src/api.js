import axios from "axios";

const apiBaseUrl = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("ctd_token")}`,
    },
    baseURL: "https://dhodonto.ctdprojetointegrador.com"
});


export default apiBaseUrl;