import { Link } from "react-router-dom";
import "./Favoritos.css";

function Favoritos({ favoritos = [] }) {
  return (
    <section className="favoritos">
      <h1>❤️ Mis Favoritos</h1>

      {favoritos.length === 0 ? (
        <div className="vacio">
          <h2>No tienes productos favoritos.</h2>
          <Link to="/">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="grid-favoritos">
          {favoritos.map((producto) => (
            <div key={producto.id} className="card-favorito">
              <img
                src={producto.imagen}
                alt={producto.nombre}
              />

              <h3>{producto.nombre}</h3>

              <p>{producto.categoria}</p>

              <strong>
                ${producto.precio.toLocaleString("es-AR")}
              </strong>

              <Link to={`/producto/${producto.id}`}>
                Ver producto
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favoritos;