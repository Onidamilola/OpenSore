import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCategories } from "../features/categoriesSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.categories
  ) as {
    items: string[];
    loading: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {items.map((category) => (
          <li key={category}>
            <Link
              to={`/category/${category}`}
              className="text-blue-600 underline"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
