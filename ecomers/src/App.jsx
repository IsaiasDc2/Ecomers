import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Acerca from "./components/Acerca";
import Contactanos from "./components/Contactanos";
import Layout from "./components/Layout";
import Carrito from "./pages/Carrito";
import CarritoLateral from "./components/CarritoLateral";
import Cuenta from "./pages/Cuenta";
import ProductoDetalle from "./components/ProductoDetalle";
import ArmaTuPC from "./components/ArmaTuPC";
import Ofertas from "./pages/Ofertas";
import Novedades from "./pages/Novedades";

import "./App.css";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const [favoritos, setFavoritos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(
      (item) => item.id === producto.id
    );

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(
      carrito.filter((item) => item.id !== id)
    );
  };

  const aumentarCantidad = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id && item.cantidad > 1
          ? {
              ...item,
              cantidad: item.cantidad - 1,
            }
          : item
      )
    );
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              cantidadCarrito={carrito.length}
              abrirCarrito={() => setMostrarCarrito(true)}
            />
          }
        >
          <Route
            index
            element={
              <Home
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="ofertas"
            element={
              <Ofertas
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="novedades"
            element={
              <Novedades
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="producto/:id"
            element={
              <ProductoDetalle
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="arma-tu-pc"
            element={
              <ArmaTuPC
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="cuenta"
            element={<Cuenta />}
          />

          <Route
            path="acerca"
            element={<Acerca />}
          />

          <Route
            path="contactanos"
            element={<Contactanos />}
          />

          <Route
            path="carrito"
            element={
              <Carrito
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            }
          />
        </Route>
      </Routes>

      <CarritoLateral
        isOpen={mostrarCarrito}
        onClose={() => setMostrarCarrito(false)}
        carrito={carrito}
        eliminarDelCarrito={eliminarDelCarrito}
        aumentarCantidad={aumentarCantidad}
        disminuirCantidad={disminuirCantidad}
      />
    </>
  );
}

export default App;