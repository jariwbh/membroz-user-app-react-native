import Axios from '../../helpers/appConfig';

export const SendEmailService = (body) => {
    return Axios.post('communications/send', body);
}

export const SendSmsService = (body) => {
    return Axios.post('communications/send', body);
}