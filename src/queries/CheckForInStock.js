import { client, Query} from "@tilework/opus";
import { API_ENDPOINT } from "../utils/apiEndpoint";

const checkForInStock = async (name) => {

  client.setEndpoint(API_ENDPOINT);

  const queryInStock = new Query("product", true)  
  .addArgument("id", "String!", name)   
  .addField("inStock")    

    return await client.post(queryInStock)
  }

export default checkForInStock