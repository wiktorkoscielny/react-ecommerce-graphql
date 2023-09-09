import { client, Query} from "@tilework/opus";
import { API_ENDPOINT } from "../utils/apiEndpoint";

const getCurrencies = async () => {

    client.setEndpoint(API_ENDPOINT);

    const queryCurrencies = new Query("currencies", true)     
    .addFieldList(["label", "symbol"])
    return await client.post(queryCurrencies)
  }

export default getCurrencies