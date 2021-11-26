import Axios from '../../helpers/appConfig'

export const advanceClaimRequestService = (data) => {
    return Axios.post('advanceclaims', data);
}

export const advanceClaimListService = () => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" }
        ]
    }
    return Axios.post('advanceclaims/filter', body);
}
