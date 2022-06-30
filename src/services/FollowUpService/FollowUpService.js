import Axios from '../../helpers/appConfig';

export const followUpService = (userID, filterValue) => {
    let body
    if (userID != null && userID != undefined && filterValue != null && filterValue != undefined) {
        body =
        {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "followup",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "assingeeuser",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                },
                {
                    "searchfield": "property.interest",
                    "searchvalue": filterValue,
                    "criteria": "eq",
                    "datatype": "text"
                }
            ], "sort": { "duedate": -1 }
        }
    } else {
        body =
        {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "followup",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "assingeeuser",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                }
            ], "sort": { "duedate": -1 }
        }
    }
    return Axios.post('activities/filter', body)
}