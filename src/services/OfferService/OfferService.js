import Axios from '../../helpers/appConfig';

const body = { "search": [{ "searchfield": "status", "searchvalue": "active", "criteria": "eq","datatype":"text" }] }

export const OfferService = () => {
    
    return Axios.post('coupons/filter', body);
}