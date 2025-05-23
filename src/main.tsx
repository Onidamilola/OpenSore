import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.tsx";
import "./index.css";
import App from "./App.tsx";
import HeaderTop from "./component/headerTop/HeaderTop"; // Add this import
import Footer from "./component/footer/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HeaderTop /> {/* Add HeaderTop here */}
        <App />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
