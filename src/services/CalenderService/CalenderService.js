import Axios from '../../helpers/appConfig';

export const CalenderService = () => {
    const body =
    {
        "search": [{ "searchfield": "status", "searchvalue": "active", "criteria": "eq" }]
    }
    return Axios.post('common/viewcalendar/filter', body)
}
