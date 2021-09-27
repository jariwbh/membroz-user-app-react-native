import Axios from '../../helpers/appConfig';

export const getByIdUserService = (id) => {
    return Axios.get('users/' + id);
}

export const patchUserService = (id, body) => {
    JSON.stringify(body);
    return Axios.patch('users/' + id, body);
}

export const CheckUserService = (body) => {
    return Axios.post('public/checkuser', body);
}