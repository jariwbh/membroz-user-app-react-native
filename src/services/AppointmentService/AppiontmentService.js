import Axios from '../../helpers/appConfig';

export const AppintmentService = (data) => {
    const body = {
        "search": [
            { "searchfield": "appointmentdate", "searchvalue": data.datRange.gte, "criteria": "gte", "datatype": "Date", "cond": "and" },
            { "searchfield": "appointmentdate", "searchvalue": data.datRange.lte, "criteria": "lte", "datatype": "Date", "cond": "and" },
            { "searchfield": "host", "searchvalue": data.id, "criteria": "eq", "datatype": "ObjectId" }],
        "sort": { "appointmentdate": -1 }
    }
    return Axios.post('appointments/filter', body);
}

export const patchAppointmentService = (id, body) => {
    return Axios.patch('appointments/' + id, body);
}

export const addAppointmentService = (data) => {
    const body = JSON.stringify(data)
    return Axios.post('appointments', body);
}