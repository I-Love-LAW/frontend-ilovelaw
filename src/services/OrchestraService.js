import axios from "axios";
import { ORCHESTRA_BACKEND_URL } from "./Config";

const ORCHESTRA_URL = ORCHESTRA_BACKEND_URL("api/orchester");

class OrchestraService {
  async orchestraConvert(data) {
    const URL = ORCHESTRA_URL + "/payment-upgrade-convert";
    let fileInputs = [];
    for (const name in data.fileInput) {
      let file = await fetch(data.fileInput[name])
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], name, { type: "application/pdf" }));
      fileInputs.push(file);
    }
    data.fileInput = fileInputs;

    return axios.post(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  orchestra(username) {
    const URL = ORCHESTRA_URL + "/payment-upgrade";
    const data = {
      "username" : username
    }
    return axios.post(URL, data);
  }
}
const orchestraService = new OrchestraService();

export default orchestraService;
