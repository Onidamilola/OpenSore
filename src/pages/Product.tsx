import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductDetails } from "../features/productsSlice";
import "./Product.css";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="product-loading">Loading product...</div>;
  if (error) return <div className="product-error">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-price">${product.price}</div>
          <Link to="/" className="product-back-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
