import { client, Query, Field} from "@tilework/opus";
import { API_ENDPOINT } from "../utils/apiEndpoint";

const getAllCategories = async () => {

  client.setEndpoint(API_ENDPOINT);

  const queryAll = new Query("category", true)      
      .addField(new Field("products", true).addFieldList(["id", "name", "brand", "attributes{id, items{value, id}}", "inStock", "gallery", "prices{amount}"]))

      return await client.post(queryAll)
}

export default getAllCategories