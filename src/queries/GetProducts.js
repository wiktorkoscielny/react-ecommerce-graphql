import { client, Query} from "@tilework/opus";
import { API_ENDPOINT } from "../utils/apiEndpoint";

const getProduct = async (product) => {

    client.setEndpoint(API_ENDPOINT);

    const query = new Query("product", true)
   .addArgument("id", "String!", product)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount}"])

    return await client.post(query)
  }

export default getProduct