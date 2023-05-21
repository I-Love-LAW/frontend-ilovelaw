import axios from "axios";
import {NOTIFIER_BACKEND_URL} from "./Config";

const NOTIFIER_URL = NOTIFIER_BACKEND_URL("")

class NotifierService {
    getNotification(username) {
        const URL = NOTIFIER_URL + 'notification/' + username;
        return axios.get(URL);
    }
}

export default new NotifierService();