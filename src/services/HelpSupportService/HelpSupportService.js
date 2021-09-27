import Axios from '../../helpers/appConfig'

export const HelpSupportService = (data) => {
    const body = JSON.stringify(data)
    return Axios.post('supports', body);
}