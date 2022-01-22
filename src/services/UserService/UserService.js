import Axios from '../../helpers/appConfig';

export const getByIdUserService = (id) => {
    return Axios.get('users/' + id);
}

export const updateUserService = (id, body) => {
    return Axios.put('users/' + id, body);
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
        },
        {
            "searchfield": "standardplan",
            "searchvalue": false,
            "criteria": "exists",
            "datatype": "boolean"
        }
        ], "sort": { "fullname": 1 },
        "formname": "user"
    }
    return Axios.post('users/filter', body);
}

export const UpdateMemberService = (id, body) => {
    return Axios.put('members/' + id, body);
}

// {
//     'searchfield': 'role',
//     'searchvalue': '5f6b3b6599e17f1ccc76318c',
//     'criteria': 'eq',
//     'datatype': 'objectId'
// }