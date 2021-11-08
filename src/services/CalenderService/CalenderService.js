import Axios from '../../helpers/appConfig';

export const HodidayService = () => {
    const body =
    {
        "search": [{
            "searchfield": "formid", "searchvalue": "611b60b0bfd7600ed8ec5429", "criteria": "eq", "datatype": "ObjectId"
        }, { "searchfield": "status", "searchvalue": "active", "criteria": "eq" }]
    }
    return Axios.post('formdatas/filter', body)
}

export const CalenderService = () => {
    const body =
    {
        "search": [{ "searchfield": "status", "searchvalue": "active", "criteria": "eq" }]
    }
    return Axios.post('common/viewcalendar/filter', body)
}
