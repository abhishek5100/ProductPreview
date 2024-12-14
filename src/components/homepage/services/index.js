import { useQuery } from "@tanstack/react-query";
import axios from "axios"


const getProductData = async () =>{
     const result = await axios.get("https://fakestoreapi.com/products");
      return result.data
}

// i create here custom hook ..................
export const useProductData = () => {
     return useQuery({
           queryKey:["product-list"],
           queryFn: getProductData
     })
}
