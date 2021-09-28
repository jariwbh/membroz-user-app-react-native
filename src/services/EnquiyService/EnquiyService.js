import Axios from '../../helpers/appConfig'

export const EnquiyService = (data) => {
    const body = JSON.stringify(data);
    return Axios.post('enquiries', body);
}
