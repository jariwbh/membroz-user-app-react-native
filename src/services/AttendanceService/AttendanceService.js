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

//add attendance when scan
export const addAttendenceService = (body) => {
    JSON.stringify(body);
    return Axios.post('attendances', body)
}

//get today attandence use
export const getTodayAttendenceService = (data) => {
    const body =
    {
        "search": [
            { "searchfield": "checkin", "searchvalue": data.date, "criteria": "fullday", "datatype": "Date" },
            { "searchfield": "membrozid", "searchvalue": data.id, "criteria": "eq", "datatype": "ObjectId" }]
    }
    return Axios.post('attendances/filter', body)
}

//Update attendance when scan
export const updateAttendenceService = (id, body) => {
    body = JSON.stringify(body);
    return Axios.put('attendances/' + id, body);
}