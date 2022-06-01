import Axios from '../../helpers/appConfig';

export const FreshLeadService = (id) => {
    const body = {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "handlerid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            },
            {
                "searchfield": "transactions",
                "searchvalue": Number(0),
                "criteria": "eq",
                "datatype": "number",
                "cond": "or"
            },
            {
                "searchfield": "transactions",
                "searchvalue": false,
                "criteria": "exists",
                "datatype": "boolean",
                "cond": "or"
            }
        ],
        "select": [
            {
                "fieldname": "property",
                "value": "1"
            },
            {
                "fieldname": "createdAt",
                "value": "1"
            }
        ], "formname": "mypromotion"
    }
    return Axios.post('enquiries/filter', body);
}

export const MyLeadService = (id) => {
    const body = {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "handlerid",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "ObjectId"
            },
        ],
        "select": [
            {
                "fieldname": "property",
                "value": "1"
            },
            {
                "fieldname": "createdAt",
                "value": "1"
            }
        ], "formname": "mypromotion"
    }
    return Axios.post('enquiries/filter', body);
}