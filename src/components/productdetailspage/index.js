
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
// get request .................. for single product
const getSingleProductData = async (id) =>{
    const result = await axios.get(`https://fakestoreapi.com/products/${id}`);
     return result.data
}
// i create here custom hook ..................
export const useSingleProductData = (id) => {
    return useQuery({
          queryKey:["product-list"],
          queryFn: () => getSingleProductData(id)
    })
}
