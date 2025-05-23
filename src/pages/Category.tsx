import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductsByCategory } from "../features/productsSlice";
import { motion, AnimatePresence } from "framer-motion";
import "./Category.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ITEMS_PER_PAGE = 6;

const Category = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (name) dispatch(fetchProductsByCategory(name));
    setCurrentPage(1);
  }, [dispatch, name]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loading)
    return <div className="category-loading">Loading products...</div>;
  if (error) return <div className="category-error">{error}</div>;

  return (
    <div className="category-container">
      <h2 className="category-title">{name}</h2>
      <AnimatePresence>
        <motion.div
          className="product-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {paginatedItems.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <Link to={`/product/${product.id}`} className="product-link">
                View Details
              </Link>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="page-button"
          >
            ◀ Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page-button ${page === currentPage ? "active" : ""}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
