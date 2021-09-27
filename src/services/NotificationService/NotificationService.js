import Axios from '../../helpers/appConfig';

export const NotificationService = (id) => {
    let body =
    {
        "search": [{ "searchfield": "receiver", "searchvalue": id, "datatype": "ObjectId", "criteria": "eq" },
        { "searchfield": "messagetype", "searchvalue": "PUSHALERT", "datatype": "text", "criteria": "eq" },
        { 'searchfield': 'status', 'searchvalue': 'active', 'criteria': 'eq', 'datatype': 'text' }
        ]
    }
    return Axios.post('communicationlogs/filter', body);
}