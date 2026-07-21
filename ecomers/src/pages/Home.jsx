import Productos from "../components/Productos";
import Banner from "../components/Banner";
import "./Home.css";

function Home({ agregarAlCarrito }) {
  return (
    <div className="home-container">

      <Banner />

      <h1>
  Hardware de alto rendimiento
</h1>

      <Productos 
        agregarAlCarrito={agregarAlCarrito}
      />

    </div>
  );
}

export default Home;