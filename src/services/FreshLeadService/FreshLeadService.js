import Axios from '../../helpers/appConfig';

export const FreshLeadService = (userID, filterValue, pageno, sizeno) => {
    let body;
    if (userID != null && userID != undefined && filterValue != null && filterValue != undefined) {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
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
                },
                {
                    "searchfield": "property.interest",
                    "searchvalue": filterValue,
                    "criteria": "eq",
                    "datatype": "text"
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
            ], "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString()
        }
    } else {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
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
            ], "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString()
        }
    }
    return Axios.post('enquiries/filter', body);
}

export const SearchFreshLeadService = (userID, filterValue, pageno, sizeno, searchtext) => {
    let body;
    if (userID != null && userID != undefined && filterValue != null && filterValue != undefined) {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
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
                },
                {
                    "searchfield": "property.interest",
                    "searchvalue": filterValue,
                    "criteria": "eq",
                    "datatype": "text"
                },
            ],
            "select": [
                {
                    "fieldname": "property.fullname",
                    "value": "1"
                },
                {
                    "fieldname": "property.website",
                    "value": "1"
                },
                {
                    "fieldname": "property.mobile",
                    "value": "1"
                },
                {
                    "fieldname": "property.primaryemail",
                    "value": "1"
                },
                {
                    "fieldname": "property.interest",
                    "value": "1"
                },
                {
                    "fieldname": "createdAt",
                    "value": "1"
                }
            ],
            "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString(), 'searchtext': searchtext
        }
    } else {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
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
                    "fieldname": "property.fullname",
                    "value": "1"
                },
                {
                    "fieldname": "property.website",
                    "value": "1"
                },
                {
                    "fieldname": "property.mobile",
                    "value": "1"
                },
                {
                    "fieldname": "property.primaryemail",
                    "value": "1"
                },
                {
                    "fieldname": "property.interest",
                    "value": "1"
                },
                {
                    "fieldname": "createdAt",
                    "value": "1"
                }
            ],
            "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString(), 'searchtext': searchtext
        }
    }
    return Axios.post('enquiries/search', body);
}

export const MyLeadService = (userID, filterValue, pageno, sizeno) => {
    let body;
    if (userID != null && userID != undefined && filterValue != null && filterValue != undefined) {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                },
                {
                    "searchfield": "property.interest",
                    "searchvalue": filterValue,
                    "criteria": "eq",
                    "datatype": "text"
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
            ], "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString()
        }
    } else {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
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
            ], "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString()
        }
    }
    return Axios.post('enquiries/filter', body);
}

export const SearchMyLeadService = (userID, filterValue, pageno, sizeno, searchtext) => {
    let body;
    if (userID != null && userID != undefined && filterValue != null && filterValue != undefined) {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                },
                {
                    "searchfield": "property.interest",
                    "searchvalue": filterValue,
                    "criteria": "eq",
                    "datatype": "text"
                },
            ],
            "select": [
                {
                    "fieldname": "property.fullname",
                    "value": "1"
                },
                {
                    "fieldname": "property.website",
                    "value": "1"
                },
                {
                    "fieldname": "property.mobile",
                    "value": "1"
                },
                {
                    "fieldname": "property.primaryemail",
                    "value": "1"
                },
                {
                    "fieldname": "property.interest",
                    "value": "1"
                },
                {
                    "fieldname": "createdAt",
                    "value": "1"
                }
            ], "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString(), 'searchtext': searchtext
        }
    } else {
        body = {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "handlerid",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                },
            ],
            "select": [
                {
                    "fieldname": "property.fullname",
                    "value": "1"
                },
                {
                    "fieldname": "property.website",
                    "value": "1"
                },
                {
                    "fieldname": "property.mobile",
                    "value": "1"
                },
                {
                    "fieldname": "property.primaryemail",
                    "value": "1"
                },
                {
                    "fieldname": "property.interest",
                    "value": "1"
                },
                {
                    "fieldname": "createdAt",
                    "value": "1"
                }
            ], "formname": "mypromotion", "pageNo": pageno.toString(), "size": sizeno.toString(), 'searchtext': searchtext
        }
    }
    return Axios.post('enquiries/search', body);
}