import { client, Query, Field} from "@tilework/opus";
import { API_ENDPOINT } from "../utils/apiEndpoint";

const getCategoriesList = async () => {

    client.setEndpoint(API_ENDPOINT);

    const queryCategoriesList = new Query("category", true)    
    .addField(new Field("products", true).addFieldList(["category"]))    

    return await client.post(queryCategoriesList)
  }

export default getCategoriesList