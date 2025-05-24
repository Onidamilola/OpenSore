import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
  const { items } = useAppSelector((state) => state.categories) as {
    items: string[];
  };

  const sortedItems = [...items].sort();

  return (
    <footer className="footer custom-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            {sortedItems.map((category) => (
              <li key={category}>
                <Link to={`/category/${category}`} className="footer-link">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Location</h4>
          <p>123 Main Street, Lagos, Nigeria</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Contact Us</h4>
          <p>
            Email: <a href="mailto:info@openstore.com">info@openstore.com</a>
          </p>
          <p>
            Phone: <a href="tel:+2348000000000">+234 800 000 0000</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 OpenStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
