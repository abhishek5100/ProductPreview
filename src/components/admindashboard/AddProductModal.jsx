import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostProductData, useUpdateProductData } from "./services";
import Loader from "../loader/Loader";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddProductModal = ({ isOpen, setIsOpen, modalType, editData, id }) => {
    const [loading, setLoading] = useState(false);
    
    const Schema = Yup.object({
        title: Yup.string().required("Product name is required").min(3, "Product name must be at least 3 characters long"),
        category: Yup.string().required("Category is required").min(3, "Category must be at least 3 characters long"),
        description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters long"),
        price: Yup.number().required("Price is required").positive("Price must be a positive number").typeError("Price must be a number"),
    });

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(Schema),
    });

    const { mutate: addProduct } = usePostProductData();
    const { mutate: updateProduct } = useUpdateProductData();

    useEffect(() => {
        if (editData) {

            setValue("title", editData.title);
            setValue("category", editData.category);
            setValue("description", editData.description);
            setValue("price", editData.price);

        }

    }, [setValue, editData]);

    const onSubmit = (data) => {

        if (modalType === "add") {
            setLoading(true);
            addProduct(data, {
                onSuccess: () => {
                    setIsOpen(false);
                    setLoading(false);
                    reset();
                    setError("")

                },
                onError: (error) => {
                    setLoading(false);
                    console.error("Error posting data:", error);
                },
            });
        }


        else if (modalType === "edit") {
            setLoading(true);
            updateProduct({ id, data }, {
                onSuccess: () => {
                    setIsOpen(false);
                    setLoading(false);
                    reset();
                    setError("")
                },
                onError: (error) => {
                    setLoading(false);
                    console.error("Error updating data:", error);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setError("")
        reset()
    };



    
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={handleCloseModal}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                {loading && <Loader />}
                <div className="bg-white w-full max-w-lg mx-4 p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">{modalType === "edit" ? "Update Product" : "Add Product"}</h2>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    className={`mt-1 block w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-outline-none`}
                                    placeholder="Enter product name"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product Category</label>
                                <input
                                    type="text"
                                    {...register("category")}
                                    className={`mt-1 block w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-outline-none`}
                                    placeholder="Enter product category"
                                />
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product Description</label>
                                <textarea
                                    {...register("description")}
                                    className={`mt-1 block w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-outline-none`}
                                    placeholder="Enter product description"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price (Rs.)</label>
                                <input
                                    {...register("price")}
                                    type="number"
                                    className={`mt-1 block w-full px-4 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-outline-none`}
                                    placeholder="Enter price"
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                            </div>

                            <div className="mt-6 flex gap-4 justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                                >
                                    {modalType === "edit" ? "Update Product" : "Add Product"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-black text-black rounded-md  focus:outline-none"
                                >
                                    cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProductModal;
