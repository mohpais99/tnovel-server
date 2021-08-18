import Axios from "axios";

let urls = {
    development: 'http://localhost:4000/v1/',
    production: 'https://your-production-url.com/api/'
}

// export const testapis = process.env['APP_URL_' + urls.toUpperCase()]

const apiconf = Axios.create({
    baseURL: urls.development,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

apiconf.interceptors.response.use(
    async (response) => {
        return Promise.resolve({data: response.data})
    },
    async (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    error.response.message = 'error'
                    break;
                case 401:
                    error.response.message = 'No authorize!'
                    break;
                case 404:
                    error.response.message = 'Not Found!'
                    break;
                default:
                    error.response.message = 'Internal Server Error'
                    break;
            }
            return Promise.reject({error: error.response.message});
        } else {
            return Promise.reject()
        }
    }
)

export default apiconf;