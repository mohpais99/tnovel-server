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
    if (!_token) {
        _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImZ6ZGV2LWFkbWluaXN0cmF0aW9uQHRub3ZlbC5jb20iLCJpYXQiOjE2MjkwOTA1NjQsImV4cCI6MTYyOTA5Nzc2NH0.7A0ao8WSi71SmTQBxm50CC3e4zpk1Bbpg4sRy6qusuE'
        apiconf.defaults.headers = {'x-access-token': _token}
    }
    var fd = new FormData();
    fd.append('file', file);
    buildFormData(fd, data)
    // fd.append('data', JSON.stringify(data));
    return apiconf.post(endpoint, fd);
    
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

export const put = async (endpoint) => {
    return
}

