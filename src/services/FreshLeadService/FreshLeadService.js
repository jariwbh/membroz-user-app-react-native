import Axios from '../../helpers/appConfig';

export const FreshLeadService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
            { "searchfield": "handlerid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" },
            { "searchfield": "transactions", "searchvalue": Number(0), "criteria": "eq" }
        ], "formname": "mypromotion"
    }
    return Axios.post('enquiries/filter', body);
}

export const MyLeadService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
            { "searchfield": "handlerid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" },
        ], "formname": "mypromotion"
    }
    return Axios.post('enquiries/filter', body);
}