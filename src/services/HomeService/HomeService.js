import Axios from '../../helpers/appConfig'

const getCategory = () => {
    return Axios.get('lookups/607d5c7bdc539117484cda38');
}

const getDashboard = (userID, branchID) => {
    let body = {
        "search": [
            {
                "searchfield": "_id",
                "searchvalue": branchID,
                "criteria": "eq",
                "datatype": "ObjectId"
            },
            {
                "searchfield": "userid",
                "searchvalue": userID,
                "criteria": "eq",
                "datatype": "ObjectId"
            }
        ],
        "id": "62bd3e25264cd749f83e9fba"
    }
    return Axios.post('analyticsreports/process', body);
}

const getDashboardFilter = (sDate, eDate) => {
    let body = {
        "search": [
            {
                "searchfield": "date",
                "searchvalue": sDate,
                "datatype": "Date",
                "criteria": "lte"
            },
            {
                "searchfield": "date",
                "searchvalue": eDate,
                "datatype": "Date",
                "criteria": "gte"
            }
        ],
        "id": "60c066895c173b555df82226"
    }
    return Axios.post('analyticsreports/process', body);
}

export { getCategory, getDashboard, getDashboardFilter };