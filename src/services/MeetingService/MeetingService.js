import Axios from '../../helpers/appConfig';

export const FreshMeetingService = (id) => {
    const body = {
        "search": [
            { "searchfield": "type", "searchvalue": "meeting", "criteria": "eq", "datatype": "text" },
            { "searchfield": "status", "searchvalue": "close", "criteria": "ne", "datatype": "text" },
            { "searchfield": "assingeeuser", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }
        ],
    }
    return Axios.post('activities/filter', body);
}
