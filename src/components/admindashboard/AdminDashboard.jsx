import React, { useState } from 'react'
import { useDeleteProductData, useProductData } from './services'
import AddProductModal from './AddProductModal'
import Loader from '../loader/Loader'

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalType, setModalType] = useState("")
    const [editData, setEditData] = useState("")
    const [id, setId] = useState(null)
    const [searchCategory, setSearchCategory] = useState('all');
    const [searchKeyword, setSearchKeyword] = useState('');
    const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
    const { data: ProductList, isLoading, error } = useProductData()
    const { mutate: deleteProduct } = useDeleteProductData()
    const handleAddProduct = () => {
        setIsOpen(true)
        setModalType("add")
    }
    const handleUpdateProduct = (ele) => {
        setEditData(ele)
        setId(ele.id)
        setIsOpen(true)
        setModalType("edit")
    }
    const handleDeleteProduct = (id) => {
        setLoading(true);
        deleteProduct(id, {
            onSuccess: () => {
                setLoading(false);
                setIsOpen(false);
            },
            onError: (error) => {
                setLoading(false);
            }
        });
    };

    const filterData = ProductList?.filter((item) => {
        const matchesCategory = searchCategory === "all" || item.category.toLowerCase().includes(searchCategory.toLowerCase());
        const matchesKeyword = item.title.toLowerCase().includes(searchKeyword.toLowerCase()) || item.description.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchesCategory && matchesKeyword;
    });


    const handleCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    const handleKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };


    if (isLoading) {
        return <h1>
            <Loader />
        </h1>
    }

    return (
        <>
            <AddProductModal isOpen={isOpen} setIsOpen={setIsOpen} modalType={modalType} setEditData = {setEditData} editData={editData} id={id} />
            <div className="flex flex-col justify-center mt-5 md:flex-row gap-4 mb-4">
                <select
                    value={searchCategory}
                    onChange={handleCategoryChange}
                    className="border border-gray-300 rounded-md p-2"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search by all keyword"
                    value={searchKeyword}
                    onChange={handleKeywordChange}
                    className="border border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className=' mr-3 p-1 flex justify-end'>
                    <button className="text-green-600 hover:text-green-800 border border-green-600 hover:bg-blue-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        onClick={handleAddProduct}
                    >Add Product</button>
                </div>
                <table className="min-w-full table-auto text-left text-sm text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Price (Rs.)</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData && filterData.map((ele) => {
                            return (
                                <tr key={ele.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img
                                            src={ele.image}
                                            alt={ele.imageAlt || "Product Image"}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4">{ele.title}</td>
                                    <td className="px-6 py-4 break-words">{ele.category}</td>
                                    <td className="px-6 py-4 break-words">{ele.description}</td>
                                    <td className="px-6 py-4">₹ {ele.price}</td>
                                    <td className="px-6 py-4 flex flex-col gap-3">
                                        <button
                                            onClick={() => handleUpdateProduct(ele)}
                                            className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(ele.id)}
                                            className="text-red-600 hover:text-red-800 border border-red-600 hover:bg-red-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                        >
                                            {loading && <Loader />}
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>


    )
}

export default AdminDashboard
