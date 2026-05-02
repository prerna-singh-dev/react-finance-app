import { StrictMode, Suspense, lazy } from "react";
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

const Dashboard = lazy(() => import("./components/Dashboard.jsx"));
const Transactions = lazy(() => import("./components/Transactions.jsx"));
const Categories = lazy(() => import("./components/Categories.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));
const AddTransaction = lazy(() => import("./components/AddTransaction.jsx"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#6e0e36] px-4 text-white">
      <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
        <div
          className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"
          aria-hidden="true"
        />
        <div className="text-sm font-medium">Loading…</div>
      </div>
    </div>
  );
}

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
      <Suspense fallback={<RouteFallback />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </Provider>
  </StrictMode>
);
