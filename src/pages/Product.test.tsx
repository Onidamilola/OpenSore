import { render, screen } from "@testing-library/react";
import Product from "./Product";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store"; // adjust if your store file is elsewhere

test("renders loading state", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
