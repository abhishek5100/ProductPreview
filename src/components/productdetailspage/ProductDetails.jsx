import { useParams } from 'react-router-dom';
import { useSingleProductData } from '.';
import Loader from '../loader/Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useSingleProductData(id);

  if (isLoading) {
    return <div className="text-center p-10">
        <Loader/>
    </div>;
  }
  if (error) {
    return <div className="text-center p-10 text-red-500">Error loading product details.</div>;
  }
  if (!product) {
    return <div className="text-center p-10">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <img src={product.image} alt={product.title} className="rounded-lg shadow-lg w-[50%] h-full object-cover" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">{product.title}</h2>
            <h2 className="text-3xl font-semibold text-gray-900">category : {product.category}</h2>
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Product Information</h3>
            <p className="text-base text-gray-500">{product.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-900">Price:</span>
              <span className="text-lg font-semibold text-indigo-600">${product.price}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
