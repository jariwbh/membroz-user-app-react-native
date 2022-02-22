import Axios from '../../helpers/appConfig';

export const AppintmentService = (data) => {
    // const body = {
    //     "search": [
    //         { "searchfield": "appointmentdate", "searchvalue": data.datRange.gte, "criteria": "fullday", "datatype": "Date" },
    //         // { "searchfield": "appointmentdate", "searchvalue": data.datRange.lte, "criteria": "lte", "datatype": "Date", "cond": "and" },
    //         { "searchfield": "host", "searchvalue": data.id, "criteria": "eq", "datatype": "ObjectId", "cond": "or" },
    //         { "searchfield": "property.supportstaff", "searchvalue": data.id, "criteria": "eq", "datatype": "ObjectId", "cond": "or" }
    //     ],
    //     "sort": { "appointmentdate": -1 }, "formname": "appointment"
    // }
    const body = {
        "search": [
            { "searchfield": "appointmentdate", "searchvalue": data.datRange.gte, "criteria": "fullday", "datatype": "Date" },
            { "searchfield": "host", "searchvalue": data.id, "criteria": "eq", "datatype": "ObjectId" },
            { "searchfield": "status", "searchvalue": ["deleted", "cancel"], "criteria": "nin" },
        ],
        "sort": { "appointmentdate": -1 }, "formname": "appointment"
    }
    return Axios.post('appointments/filter', body);
}

export const AppintmentSupportStaffService = (data) => {
    const body = {
        "search": [
            { "searchfield": "appointmentdate", "searchvalue": data.datRange.gte, "criteria": "fullday", "datatype": "Date" },
            { "searchfield": "property.supportstaff", "searchvalue": data.id, "criteria": "eq", "datatype": "ObjectId" },
            { "searchfield": "status", "searchvalue": ["deleted", "cancel"], "criteria": "nin" },
        ],
        "sort": { "appointmentdate": -1 }, "formname": "appointment"
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