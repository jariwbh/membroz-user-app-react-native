import Axios from '../../helpers/appConfig';


export const OfferService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" },
            { "searchfield": "handlerid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }

        ]
    }

    return Axios.post('enquiries/filter', body);
}