import Axios from '../../helpers/appConfig';

export const DispositionService = () => {
    const body =
    {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
            {
                "searchfield": "formid",
                "searchvalue": "59f430a7bd4e4bb2fb72ec7d",
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ]
    }
    return Axios.post('dispositions/filter', body)
}

export const followupHistoryService = () => {
    const body =
    {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
            {
                "searchfield": "formid",
                "searchvalue": "59f430a7bd4e4bb2fb72ec7d",
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ]
    }
    return Axios.post('activities/filter', body)
}
