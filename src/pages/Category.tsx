import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductsByCategory } from "../features/productsSlice";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  // add other fields as needed
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const ITEMS_PER_PAGE = 6;

const Category = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (name) dispatch(fetchProductsByCategory(name));
    setCurrentPage(1); // reset page when category changes
  }, [dispatch, name]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">{name}</h2>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {paginatedItems.map((product: Product) => (
            <div key={product.id} className="bg-white rounded shadow p-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain w-full mb-2"
              />
              <h3 className="text-md font-semibold truncate">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600">${product.price}</p>
              <Link
                to={`/product/${product.id}`}
                className="text-blue-600 text-sm underline mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2 items-center">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-full font-medium border border-gray-300 hover:bg-blue-100 disabled:opacity-50"
          >
            ◀ Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 border ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-full font-medium border border-gray-300 hover:bg-blue-100 disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;