import apiconf from './config';
import { buildFormData } from './global';

export const get = async (endpoint, _token) => {
    if (_token) apiconf.defaults.headers = {'x-access-_token': _token}
    const data = await apiconf.get(endpoint)
        .then(res => {
            const {data} = res.data
            return data
        })
        .catch(err => {
            console.log(err);
            return false
        })
    return data
}

export const fUpload = async (endpoint, file, data, _token) => {
    if (_token) apiconf.defaults.headers = {'x-access-token': _token}
    var fd = new FormData();
    fd.append('file', file);
    buildFormData(fd, data)
    const upload = apiconf.post(endpoint, fd)
        .then(res => {
            // const {s, message} = res.data
            return res.data
        })
        .catch(err => {
            console.log(err);
            return false
        })
    
    return upload
    // fd.append('data', JSON.stringify(data));
    // return apiconf.post(endpoint, fd);
}

export const post = async (endpoint, _body, _token) => {
    if (_token) apiconf.defaults.headers = {'x-access-_token': _token}
    const data = await apiconf.post(endpoint, _body)
        .then(res => {
            var response = res.data
            return response
        })
        .catch(err => {
            console.log(err);
            return false
        })
    return data
}

export const put = async (endpoint, _token) => {
    if (_token) apiconf.defaults.headers = {'x-access-_token': _token}
    const data = await apiconf.put(endpoint)
        .then(res => {
            const {data} = res.data
            return data
        })
        .catch(err => {
            console.log(err);
            return false
        })
    return data
}

