import React, { useState } from 'react'
import { useProductData } from './services'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader'
import ReviewAndRating from '../review&rating/ReviewAndRating'

const HomePage = () => {
        const [searchKeyword, setSearchKeyword] = useState('');
    
    const { data: ProductList, isLoading, error } = useProductData()

    const filterData = ProductList?.filter((item) => {
        const matchesKeyword = item.title.toLowerCase().includes(searchKeyword.toLowerCase()) || item.description.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchesKeyword;
    });
    const handleKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    if (isLoading) {
        return <h1>
            <Loader />
        </h1>
    }
    return (
        <div>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <div  className='flex justify-evenly'>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products List</h2>
                    <input
                    type="text"
                    placeholder="Search by all keyword"
                    value={searchKeyword}
                    onChange={handleKeywordChange}
                    className="border border-gray-300 rounded-md p-2"
                />
                  </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {filterData && filterData?.map((item) => (
                            <div key={item.id} className="group relative border p-5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                                <Link to={`/product-details/${item.id}`}>
                                    <img
                                        alt={item.imageAlt}
                                        src={item.image}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                    />
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-700">
                                                {item.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">₹ {item.price}</p>
                                    </div>
                                  <ReviewAndRating item = {item}/>
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>
            </div>




        </div>
    )
}

export default HomePage
