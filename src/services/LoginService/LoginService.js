import Axios from '../../helpers/appConfig';

export const LoginService = (body) => {
    body = JSON.stringify(body);
    return Axios.post('auth/memberlogin', body);
}