import Axios from '../../helpers/appConfig';

export const followUpService = (userID, filterValue, pageno, sizeno) => {
    let body
    if (userID != null && userID != undefined && filterValue != null && filterValue != undefined) {
        body =
        {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "followup",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "assingeeuser",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                },
                {
                    "searchfield": "property.interest",
                    "searchvalue": filterValue,
                    "criteria": "eq",
                    "datatype": "text"
                }
            ], "sort": { "duedate": -1 }, "pageNo": pageno.toString(), "size": sizeno.toString()
        }
    } else {
        body =
        {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "followup",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "assingeeuser",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                }
            ], "sort": { "duedate": -1 }, "pageNo": pageno.toString(), "size": sizeno.toString()
        }
    }
    return Axios.post('activities/filter', body)
};

export const SearchFollowUpService = (userID, filterValue, pageno, sizeno, searchtext) => {
    let body
    if (userID != null && userID != undefined && filterValue != null && filterValue != undefined) {
        body =
        {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "followup",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "assingeeuser",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                },
                {
                    "searchfield": "property.interest",
                    "searchvalue": filterValue,
                    "criteria": "eq",
                    "datatype": "text"
                }
            ],
            "select": [
                {
                    "fieldname": "customerid.property.fullname",
                    "value": "1"
                },
                {
                    "fieldname": "customerid.property.mobile",
                    "value": "1"
                },
                {
                    "fieldname": "status",
                    "value": "1"
                },
                {
                    "fieldname": "addedby",
                    "value": "1"
                },
                {
                    "fieldname": "assingeeuser",
                    "value": "1"
                },
                {
                    "fieldname": "branchid",
                    "value": "1"
                },
                {
                    "fieldname": "dispositionid",
                    "value": "1"
                },
                {
                    "fieldname": "duedate",
                    "value": "1"
                },
                {
                    "fieldname": "createdAt",
                    "value": "1"
                },
                {
                    "fieldname": "type",
                    "value": "1"
                },
                {
                    "fieldname": "property",
                    "value": "1"
                },
                {
                    "fieldname": "updatedAt",
                    "value": "1"
                },
                {
                    "fieldname": "onModel",
                    "value": "1"
                }
            ],
            "formname": 'activitylog',
            "sort": { "duedate": -1 },
            "pageNo": pageno.toString(),
            "size": sizeno.toString(),
            'searchtext': searchtext
        }
    } else {
        body =
        {
            "search": [
                {
                    "searchfield": "status",
                    "searchvalue": "followup",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "assingeeuser",
                    "searchvalue": userID,
                    "criteria": "eq",
                    "datatype": "ObjectId"
                }
            ],
            "select": [
                {
                    "fieldname": "customerid.property.fullname",
                    "value": "1"
                },
                {
                    "fieldname": "customerid.property.mobile",
                    "value": "1"
                },
                {
                    "fieldname": "status",
                    "value": "1"
                },
                {
                    "fieldname": "addedby",
                    "value": "1"
                },
                {
                    "fieldname": "assingeeuser",
                    "value": "1"
                },
                {
                    "fieldname": "branchid",
                    "value": "1"
                },
                {
                    "fieldname": "dispositionid",
                    "value": "1"
                },
                {
                    "fieldname": "duedate",
                    "value": "1"
                },
                {
                    "fieldname": "createdAt",
                    "value": "1"
                },
                {
                    "fieldname": "type",
                    "value": "1"
                },
                {
                    "fieldname": "property",
                    "value": "1"
                },
                {
                    "fieldname": "updatedAt",
                    "value": "1"
                },
                {
                    "fieldname": "onModel",
                    "value": "1"
                }
            ],
            "formname": 'activitylog',
            "sort": { "duedate": -1 },
            "pageNo": pageno.toString(),
            "size": sizeno.toString(),
            'searchtext': searchtext
        }
    }
    return Axios.post('activities/search', body)
};


