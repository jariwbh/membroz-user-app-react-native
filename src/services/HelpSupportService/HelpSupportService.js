import Axios from '../../helpers/appConfig'

export const HelpSupportService = (data) => {
    return Axios.post('supports', data);
}

export const supportHistoryService = (id) => {
    const body = {
        "search": [
            {
                "searchfield": "customerid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ]
    }
    return Axios.post('supports/filter', body);
}