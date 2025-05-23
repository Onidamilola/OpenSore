import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCategories } from "../features/categoriesSlice";
import { Link } from "react-router-dom";
import Header from "../component/header/Header";
import "./Home.css";

interface CategoryImageMap {
  [key: string]: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.categories
  ) as {
    items: string[];
    loading: boolean;
    error: string | null;
  };

  const [categoryImages, setCategoryImages] = useState<CategoryImageMap>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    async function fetchCategoryImages() {
      const newImages: CategoryImageMap = {};
      for (const category of items) {
        try {
          const res = await fetch(
            `https://fakestoreapi.com/products/category/${category}`
          );
          const products = await res.json();
          if (products.length > 0) {
            newImages[category] = products[0].image;
          }
        } catch (error) {
          console.error("Error fetching category image:", error);
        }
      }
      setCategoryImages(newImages);
    }

    if (items.length) {
      fetchCategoryImages();
    }
  }, [items]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="roller"></div>
        <div className="loading-text">Loading categories...</div>
      </div>
    );
  }

  if (error) return <div className="error">Error: {error}</div>;

  const sortedItems = [...items].sort();

  return (
    <>
      <div className="home-container">
        <Header />
        <h2 className="home-title">Shop by Category</h2>
        <div className="categories-scroll-container">
          <div className="categories-slider">
            {sortedItems.map((category) => (
              <div className="category-card" key={category}>
                <Link to={`/category/${category}`}>
                  {categoryImages[category] ? (
                    <img
                      src={categoryImages[category]}
                      alt={category}
                      className="category-image"
                    />
                  ) : (
                    <div className="category-icon">📦</div>
                  )}
                </Link>
                <Link to={`/category/${category}`} className="category-name">
                  {category}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
