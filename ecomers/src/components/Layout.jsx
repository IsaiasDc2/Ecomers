import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarCategorias from "./NavbarCategorias";
import Footer from "./Footer";

function Layout({ cantidadCarrito, abrirCarrito }) {
  return (
    <>
      <Navbar
        cantidadCarrito={cantidadCarrito}
        abrirCarrito={abrirCarrito}
      />

      <NavbarCategorias />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;