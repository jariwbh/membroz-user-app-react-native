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

export const followupHistoryService = (id) => {
    const body =
    {
        "search": [
            {
                "searchfield": "customerid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ]
    }
    return Axios.post('activities/filter', body)
}

export const addDispositionService = (body) => {
    return Axios.post('activities', body)
}