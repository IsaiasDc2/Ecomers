import { useState } from "react";
import "./Contactanos.css";

function Contactanos() {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    setTimeout(() => {
      alert("Mensaje enviado correctamente");
      e.target.reset();
      setEnviando(false);
    }, 600);
  };

  return (
    <div className="contacto-container">
      <h1>Contactanos</h1>

      <form className="formulario" onSubmit={handleSubmit}>
        <h2>
          ¿Necesitás ayuda con tu PC?
        </h2>
        {enviando ? "Enviando..." : "Enviar consulta →"}
        <div className="grupo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            required
            minLength={3}
          />
        </div>

        <div className="grupo">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div className="grupo">
          <label htmlFor="asunto">Asunto</label>
          <input
            id="asunto"
            name="asunto"
            type="text"
            placeholder="Asunto"
            required
            minLength={5}
          />
        </div>

        <div className="grupo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Escribe tu mensaje..."
            rows={5}
            required
            minLength={10}
          ></textarea>
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar mensaje →"}
        </button>
      </form>
    </div>
  );
}

export default Contactanos;