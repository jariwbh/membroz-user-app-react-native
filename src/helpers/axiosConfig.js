import appConfig from './appConfig';
var date = new Date();
var timezone = date.getTimezoneOffset();

function axiosConfig(token) {
    if (token) {
        appConfig.defaults.headers.common['authkey'] = token;
        appConfig.defaults.headers.common['timezone'] = timezone;
    } else {
        delete appConfig.defaults.headers.common['authkey'];
    }
}

export default axiosConfig;
