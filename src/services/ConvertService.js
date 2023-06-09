import axios from "axios";
import { CONVERT_BACKEND_URL } from "./Config";

const CONVERT_URL = CONVERT_BACKEND_URL("api/convert");

class ConvertService {
  convert(fileInput, imageFormat, singleOrMultiple, colorType, dpi, username) {
    const PDF_TO_IMG_URL = CONVERT_URL + "/pdf-to-img";
    const data = { fileInput: fileInput, imageFormat: imageFormat, singleOrMultiple: singleOrMultiple, colorType: colorType, dpi: dpi, username: username };
    return axios.post(PDF_TO_IMG_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getProgress(id) {
    const PROGRESS_URL = CONVERT_URL + "/progress/" + id;
    return axios.get(PROGRESS_URL);
  }

  getHistory(username) {
    const HISTORY_URL = CONVERT_URL + "/history/" + username;
    return axios.get(HISTORY_URL);
  }

  getConvertHistoryById(username, id) {
    const HISTORY_BY_ID_URL = CONVERT_URL + "/history/" + username + "/" + id;
    return axios.get(HISTORY_BY_ID_URL);
  }

  getLastHistory(username) {
    const LAST_HISTORY_URL = CONVERT_URL + "/history/last/" + username;
    return axios.get(LAST_HISTORY_URL);
  }

  deleteHistory(id, username) {
    const DELETE_HISTORY_URL = CONVERT_URL + "/history/" + username + "?id=" + id;
    return axios.delete(DELETE_HISTORY_URL);
  }
}
const convertService = new ConvertService();

export default convertService;
