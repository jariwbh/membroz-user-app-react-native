import Axios from '../../helpers/appConfig';

export const AttendenceService = (data) => {
    const body =
    {
        "search": [
            { "searchfield": "checkin", "searchvalue": data.datRange.gte, "criteria": "gte", "datatype": "Date", "cond": "and" },
            { "searchfield": "checkin", "searchvalue": data.datRange.lte, "criteria": "lte", "datatype": "Date", "cond": "and" },
            { "searchfield": "membrozid", "searchvalue": data.id, "criteria": "eq", "datatype": "ObjectId" }]
    }
    return Axios.post('attendances/filter', body)
}
