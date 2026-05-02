import { Link } from "react-router-dom";
function NotFound() {
  return (
    <section className="flex items-center justify-center bg-white p-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">404</h1>
        <p className="mt-1 text-lg font-semibold text-slate-900">
          Page not found
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Use the links in the left sidebar to continue, or go back to the
          dashboard.
        </p>
        <div className="mt-5">
          <Link
            to="/"
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-pink-700 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-pink-600"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
