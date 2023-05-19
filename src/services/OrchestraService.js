import axios from "axios";
import {PAYMENT_BACKEND_URL} from "./Config";

const ORCHESTRA_URL = PAYMENT_BACKEND_URL("api/orchester")

class OrchestraService {
    orchestraConvert(data) {
        const URL = ORCHESTRA_URL + '/payment-upgrade-convert';
        return axios.post(URL, data);
    }

    orchestra(data) {
        const URL = ORCHESTRA_URL + '/payment-upgrade';
        return axios.post(URL, data);
    }
}

export default new OrchestraService();