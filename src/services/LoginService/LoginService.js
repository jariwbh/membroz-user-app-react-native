import Axios from '../../helpers/appConfig';

export const LoginService = (body) => {
    JSON.stringify(body);
    return Axios.post('auth/login', body);
}