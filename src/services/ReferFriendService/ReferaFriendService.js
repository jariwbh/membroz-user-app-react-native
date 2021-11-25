import Axios from '../../helpers/appConfig';

export const ReferFriendService = (body) => {
    return Axios.post('enquiries', body);
}

export const ReferFriendListService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
            { "searchfield": "handlerid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }
        ]
    }
    return Axios.post('enquiries/filter', body);
}