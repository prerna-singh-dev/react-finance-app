import Sidebar from "./components/Sidebar";
import TopNavigation from "./components/TopNavigation";
import Particle from "./components/Particle";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <Particle />
      <div className="min-h-screen">
        <div className="mx-auto flex flex-col lg:flex-row max-w-7xl gap-6 px-4 pb-6 pt-20 sm:px-6 lg:px-8 lg:py-6">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="lg:hidden">
            <TopNavigation />
          </div>
          <ErrorBoundary>
            <main className="min-w-0 flex-1">
              <Outlet />
            </main>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default App;
