import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { toast } from "react-toastify";

// get request .................. for product
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


// post request .................. for product
const postProductData = async (data) => {
    const result = await axios.post("https://fakestoreapi.com/products" , data);
    return result.data
  };
  export const usePostProductData = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
       onMutate:()=>{},
       onError:(error)=>{
        toast.error("some thing wrong")
       },
       onSuccess:()=>{
        queryClient.invalidateQueries(["product-list"])
        toast.success("Product added successfully")

       },
       mutationFn:(data)=>postProductData(data)
  
    })
  }


// update request .................. for product
const UpdateProductData = async ({id,data}) => {
    const result = await axios.put(`https://fakestoreapi.com/products/${id}` , data);
    return result.data
  };
  export const useUpdateProductData = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
       onMutate:()=>{},
       onError:(error)=>{
       console.log(error)
       },
       onSuccess:(data)=>{
        // queryClient.resetQueries(["product-list"])
        queryClient.invalidateQueries(["product-list"])
        toast.success("Product Updated successfully")

       },
       mutationFn:({id,data})=>UpdateProductData({id,data})
  
    })
  }



  // delete request .................. for product
const DeleteProductData = async (id) => {
    const result = await axios.delete(`https://fakestoreapi.com/products/${id}`);
    return result.data
  };
  export const useDeleteProductData = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
       onMutate:()=>{},
       onError:(error)=>{
       console.log(error)
       },
       onSuccess:(data)=>{
        // queryClient.resetQueries(["product-list"])
        queryClient.invalidateQueries(["product-list"])
        toast.success("Product Deleted successfully")

       },
       mutationFn:(id)=>DeleteProductData(id)
  
    })
  }