import Sidebar from "./components/Sidebar";
import Particle from "./components/Particle";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Particle />
      <div className="min-h-screen">
        <div className="mx-auto flex  max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
