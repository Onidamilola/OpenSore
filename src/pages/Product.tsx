import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductDetails } from "../features/productsSlice";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="p-4">Loading product...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded shadow p-4 grid md:grid-cols-2 gap-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain w-full"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <div className="text-lg font-semibold mb-2">${product.price}</div>
          <Link to="/" className="text-blue-600 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
