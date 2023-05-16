import axios from "axios";
import {PAYMENT_BACKEND_URL} from "./Config";

const PAYMENT_URL = PAYMENT_BACKEND_URL("api/payment")

class PaymentService {
    makePayment(username) {
        const MAKE_PAYMENT_URL = PAYMENT_URL + '/create-payment';
        const data = {username: username};

        return axios.post(MAKE_PAYMENT_URL, data);
    }

    getPayment(username) {
        const GET_PAYMENT_URL = PAYMENT_URL + '/' + username;
        return axios.get(GET_PAYMENT_URL);
    }
}

export default new PaymentService();