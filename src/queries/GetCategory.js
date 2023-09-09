import { client, Query, Field} from "@tilework/opus";
import { API_ENDPOINT } from "../utils/apiEndpoint";

const getCategory = async (category) => {

  client.setEndpoint(API_ENDPOINT);

  const queryCategory = new Query("category", true)
    .addArgument("input", "CategoryInput", { title : category})
    .addField(new Field("products", true).addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount}"]))    

    return await client.post(queryCategory)
  }

export default getCategory
