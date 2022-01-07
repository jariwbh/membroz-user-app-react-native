import Axios from '../../helpers/appConfig'

export const salaryComponentService = (id) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" }
        ]
    }
    return Axios.post('salarycomponents/filter', body);
}

export const userSalaryService = (year) => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "paid", "criteria": "eq", "datatype": "text" },
            // { "searchfield": "year", "searchvalue": year, "criteria": "eq", "datatype": "text" }
        ]
    }
    return Axios.post('payrolls/filter', body);
}

export const yearAndMonthService = () => {
    const body = {
        "search": [
            { "searchfield": "status", "searchvalue": "paid", "criteria": "eq", "datatype": "text" }
        ]
    }
    return Axios.post('payrolls/filter', body);
}