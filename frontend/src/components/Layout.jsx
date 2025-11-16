import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
