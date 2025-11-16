import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

function Layout() {
  useEffect(() => {
    // Force initial render to complete before showing content
    document.documentElement.style.setProperty("--initial-render", "complete");
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
