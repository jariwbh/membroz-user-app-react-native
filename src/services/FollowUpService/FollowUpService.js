import Axios from '../../helpers/appConfig';

export const followUpService = (id) => {
    const body =
    {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "close",
                "criteria": "ne",
                "datatype": "text"
            },
            {
                "searchfield": "assingeeuser",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            },

        ], "sort": { "duedate": -1 }
    }
    return Axios.post('activities/filter', body)
}