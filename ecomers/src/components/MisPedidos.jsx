import "./MisPedidos.css";

function MisPedidos({ pedidos = [] }) {
  return (
    <section className="mis-pedidos">

      <h1>📦 Mis Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="pedido-vacio">
          <h2>Aún no realizaste ninguna compra.</h2>
        </div>
      ) : (
        pedidos.map((pedido, index) => (
          <div
            key={index}
            className="pedido"
          >
            <div className="pedido-header">
              <h2>Pedido #{index + 1}</h2>

              <span className="estado">
                {pedido.estado || "Preparando"}
              </span>
            </div>

            <div className="productos">
              {pedido.productos.map((producto) => (
                <div
                  key={producto.id}
                  className="producto"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                  />

                  <div>
                    <h3>{producto.nombre}</h3>

                    <p>
                      Cantidad: {producto.cantidad}
                    </p>

                    <strong>
                      $
                      {(
                        producto.precio *
                        producto.cantidad
                      ).toLocaleString("es-AR")}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <h3>
              Total: $
              {pedido.productos
                .reduce(
                  (acc, p) =>
                    acc + p.precio * p.cantidad,
                  0
                )
                .toLocaleString("es-AR")}
            </h3>
          </div>
        ))
      )}
    </section>
  );
}

export default MisPedidos;