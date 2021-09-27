import Axios from '../../helpers/appConfig';

export const ForgetPasswordService = (body) => {
    return Axios.post('public/user/resetpassword', body);
}

export const ChangePasswordService = (body) => {
    return Axios.post('users/changepassword', body);
}