import Axios from '../../helpers/appConfig';

export const getByIdUserService = (id) => {
    return Axios.get('users/' + id);
}

export const patchUserService = (id, body) => {
    JSON.stringify(body);
    return Axios.patch('users/' + id, body);
}

export const CheckUserService = (body) => {
    return Axios.post('public/checkuser', body);
}

export const UserListService = () => {
    let body = {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }], "sort": { "createdAt": 1 },
        "formname": "user"
    }
    return Axios.post('users/filter', body);
}

// {
//     'searchfield': 'role',
//     'searchvalue': '5f6b3b6599e17f1ccc76318c',
//     'criteria': 'eq',
//     'datatype': 'objectId'
// }