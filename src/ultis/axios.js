import axios from 'axios';

const request = axios.create({
    // baseURL: `https://zingmp3api.vercel.app/ooms-api`,
    baseURL: `http://localhost:9001/ooms-api`,
});

request.interceptors.response.use(
    (res) => {
        return res.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default request;