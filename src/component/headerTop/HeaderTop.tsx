import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import "./HeaderTop.css";

const HeaderTop = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [history, setHistory] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setHistory(["/"]);
    } else {
      setHistory((prev) => {
        if (
          prev.length === 0 ||
          (prev[prev.length - 1] !== location.pathname &&
            !prev.includes(location.pathname))
        ) {
          return [...prev, location.pathname];
        }
        return prev;
      });
    }
  }, [location.pathname]);

  const breadcrumbs = history.map((path, idx) => {
    const name = path === "/" ? "Home" : path.replace("/", "");
    return (
      <span key={idx}>
        {idx > 0 && " / "}
        <Link to={path}>{name || "Home"}</Link>
      </span>
    );
  });

  return (
    <div className="top-header">
      <Link to="/" className="logo">
        OpenStore
      </Link>
      <div className="header-breadcrumbs">{breadcrumbs}</div>
      <div className="header-right">
        <div className="time">{time}</div>
        <Link to="/cart" className="cart-icon">
          <FiShoppingCart />
        </Link>
      </div>
    </div>
  );
};

export default HeaderTop;
