// components/Header.tsx
import { useEffect, useState } from "react";
import "./Header.css";

const imageData = [
  {
    title: "Men's Clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    title: "Women's Clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
  {
    title: "Electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  },
  {
    title: "Jewelry",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  },
];

const Header = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % imageData.length);
      setIsSliding(true);
      setTimeout(() => setIsSliding(false), 500); // match CSS transition
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  const handleDotClick = (i: number) => {
    if (i !== index) {
      setPrevIndex(index);
      setIndex(i);
      setIsSliding(true);
      setTimeout(() => setIsSliding(false), 500);
    }
  };

  return (
    <div className="header">
      <div className={`header-image-wrapper${isSliding ? " sliding" : ""}`}>
        <img
          key={index}
          src={imageData[index].image}
          alt={imageData[index].title}
          className="header-image"
        />
      </div>
      <div className="header-title">{imageData[index].title}</div>
      <div className="header-pagination">
        {imageData.map((_, i) => (
          <span
            key={i}
            className={`header-dot${i === index ? " active" : ""}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
