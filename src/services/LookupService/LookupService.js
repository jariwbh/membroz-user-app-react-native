import Axios from '../../helpers/appConfig'

export const filterService = () => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq" },
            { "searchfield": "lookup", "searchvalue": "interest", "criteria": "eq" }
        ]
    }
    return Axios.post('lookups/filter', body);
}