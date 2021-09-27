import Axios from 'axios';
import * as URL from '../../app-start';

const appConfig = Axios.create({
    baseURL: URL.baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default appConfig;