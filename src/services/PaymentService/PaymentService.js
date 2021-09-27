import Axios from '../../helpers/appConfig';

export const PaymentHistoryService = (id) => {
    const body = {
        "search":
            [
                { "searchfield": "status", "searchvalue": "Paid", "criteria": "eq", "datatype": "text" },
                { "searchfield": "memberid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }
            ]
    }
    return Axios.post('payments/filter', body);
}

export const PaymentScheduleService = (id) => {
    const body = {
        "search":
            [
                { "searchfield": "status", "searchvalue": ["Paid", "deleted"], "criteria": "nin", "datatype": "text" },
                { "searchfield": "memberid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }
            ]
    }
    return Axios.post('paymentschedules/filter', body);
}

export const BillPaymentService = (data) => {
    const body = JSON.stringify(data)
    return Axios.post('payments', body);
}