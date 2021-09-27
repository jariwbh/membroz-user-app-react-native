import Axios from '../../helpers/appConfig';

const body = { "search": [{ "searchfield": "status", "searchvalue": "active", "criteria": "eq" }] }

export const GalleryService = () => {
    return Axios.post('documents/filter', body);
}
