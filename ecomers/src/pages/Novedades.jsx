import { useEffect, useState } from "react";
import {
  FaStar,
  FaCartShopping,
  FaHeart,
  FaTruck,
  FaBoxOpen,
  FaEye
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Novedades.css";

function Novedades({ agregarAlCarrito }) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {

    async function cargarNovedades() {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*");

        if (error) throw new Error(error.message);

        const lista = Array.isArray(data) ? data : [];
        setProductos(lista.slice(-8).reverse());

      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    }

    cargarNovedades();

  }, []);

  const toggleFavorito = (id) => {

    if (favoritos.includes(id)) {

      setFavoritos(
        favoritos.filter((fav) => fav !== id)
      );

    } else {

      setFavoritos([...favoritos, id]);

    }

  };

  if (cargando) {

    return (
      <div className="estado-novedades">
        Cargando novedades...
      </div>
    );

  }

  return (

    <div className="novedades-container">

      <div className="novedades-header">

        <h1>

          <FaStar />

          Novedades

        </h1>

        <p>
          Descubrí los productos más recientes de PixelCore.
        </p>

      </div>

      <div className="grid-novedades">

        {productos.map((producto) => (

          <div
            className="card-novedad"
            key={producto.id}
          >

            <span className="badge-nuevo">
              NUEVO
            </span>

            <button
              className="favorito"
              onClick={() => toggleFavorito(producto.id)}
            >

              {favoritos.includes(producto.id)
                ? "❤️"
                : <FaHeart />}

            </button>

            <img
              src={producto.imagen}
              alt={producto.nombre}
            />

            <h3>
              {producto.nombre}
            </h3>

            <div className="rating">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>

            <div className="stock">

              <FaBoxOpen />

              Stock disponible

            </div>

            <div className="envio">

              <FaTruck />

              Envío gratis

            </div>

            <div className="cuotas">

              Hasta 12 cuotas sin interés

            </div>

            <p className="precio">

              ${producto.precio.toLocaleString()}

            </p>

            <div className="botones">

              <Link
                to={`/producto/${producto.id}`}
                className="btn-detalle"
              >

                <FaEye />

                Ver

              </Link>

              <button
                className="btn-carrito"
                onClick={() => agregarAlCarrito(producto)}
              >

                <FaCartShopping />

                Agregar

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Novedades;