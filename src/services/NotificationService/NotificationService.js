import Axios from '../../helpers/appConfig';

export const NotificationService = (id) => {
    let body =
    {
        "search": [{ "searchfield": "receiver", "searchvalue": id, "datatype": "ObjectId", "criteria": "eq" },
        { "searchfield": "messagetype", "searchvalue": "PUSHALERT", "datatype": "text", "criteria": "eq" },
        { 'searchfield': 'status', 'searchvalue': 'active', 'criteria': 'eq', 'datatype': 'text' }
        ]
    }
    return Axios.post('communicationlogs/filter', body);
}

export const getByIdNotificationDeleteService = (id) => {
    return Axios.delete('communicationlogs/' + id);
}

export const deleteAllNotificationService = (data) => {
    let body = {
        "schemaname": "communicationlogs",
        "fieldname": "status",
        "fieldvalue": "deleted",
        "ids": data
    }
    return Axios.post('common/massupdate', body);
}

export const AannouncementService = (id) => {
    let body =
    {
        "search": [
            {
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "receiver",
                "searchvalue": id,
                "criteria": "in",
                "datatype": "ObjectId"
            },
            {
                "searchfield": "communicationid",
                "searchvalue": false,
                "criteria": "exists",
                "datatype": "boolean"
            }
        ]

    }
    return Axios.post('communicationlogs/filter', body);
}