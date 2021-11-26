import Axios from '../../helpers/appConfig'

export const leaveRequestService = (data) => {
    return Axios.post('leaverequests', data);
}

export const leaveRequestListService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
            { "searchfield": "userid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }
        ]
    }
    return Axios.post('leaverequests/filter', body);
}

export const leaveTypeService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" }
        ]
    }
    return Axios.post('leavetypes/filter', body);
}