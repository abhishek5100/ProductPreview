import React from 'react'

const ReviewAndRating = ({item}) => {
    return (
        <div>
            <div className="mt-2 flex items-center">
                <div className="flex items-center">
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <svg
                                key={index}
                                className={`h-4 w-4 ${item.rating.rate > index ? 'text-yellow-400' : 'text-gray-300'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 15.27l4.47 2.35-1.21-5.29L18 7.24l-5.4-.46L10 2 7.4 6.78 2 7.24l4.74 5.09-1.2 5.29L10 15.27z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">({item.rating.count} reviews)</p>
            </div>
        </div>
    )
}

export default ReviewAndRating
