import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa6";

import ProductCard from "../components/ProductCard";

import "./Ofertas.css";


function Ofertas({ agregarAlCarrito }) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    fetch("http://localhost:3000/productos")
      .then(res => res.json())
      .then(data => {

        const productosOferta = data.filter(
          producto => producto.descuentoPorcentaje > 0
        );

        setProductos(productosOferta);
        setCargando(false);

      })
      .catch(error => {
        console.log(error);
        setCargando(false);
      });

  }, []);


  return (
    <main className="ofertas-container">

      <section className="ofertas-header">
        <h1>
          <FaFire />
          Ofertas especiales
        </h1>

        <p>
          Aprovechá descuentos en componentes y periféricos.
        </p>
      </section>

      {
        cargando ? (
          <p className="estado-oferta">
            Cargando ofertas...
          </p>
        ) : productos.length === 0 ? (
          <p className="estado-oferta">
            No hay ofertas disponibles
          </p>
        ) : (
          <div className="grid-ofertas">
            {
              productos.map(producto => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  agregarAlCarrito={agregarAlCarrito}
                />
              ))
            }
          </div>
        )
      }

    </main>
  );
}

export default Ofertas;