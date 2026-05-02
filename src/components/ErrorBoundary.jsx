import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("ErrorBoundary caught an error::", error, info);
  }

  render() {
    const errorMessage =
      this.state.error?.message || "Something went wrong. Please try again.";

    if (this.state.hasError)
      return (
        <section className="w-full flex flex-col justify-center items-center py-50 px-6 text-center bg-white">
          <h1 className="text-4xl font-bold text-slate-900 my-4">
            Error occurred
          </h1>
          <p className="mt-1 text-sm font-semibold text-red-600 border-b-2 border-dashed border-gray-300 my-2">
            {errorMessage}
          </p>
          <p className="mt-2 text-sm text-slate-600 my-5">
            Use the links in the left sidebar to continue, or go back to the
            dashboard.
          </p>
          <Link
            to="/"
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-pink-700 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-pink-600"
          >
            Go to dashboard
          </Link>
        </section>
      );
    else return this.props.children;
  }
}

export default ErrorBoundary;
