import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.jsx/store.js";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Transactions from "./components/Transactions.jsx";
import Categories from "./components/Categories.jsx";
import NotFound from "./components/NotFound.jsx";
import AddTransaction from "./components/AddTransaction.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="transactions" element={<Outlet />}>
        <Route index element={<Transactions />} />
        <Route path="list" element={<Transactions />} />
        <Route path="add" element={<AddTransaction />} />
        <Route path="edit/:id" element={<AddTransaction />} />
      </Route>
      <Route path="categories" element={<Categories />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
