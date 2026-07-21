import { Link } from "react-router-dom";

import {
  FaMicrochip,
  FaScrewdriverWrench,
  FaFire,
  FaStar
} from "react-icons/fa6";


import "./NavbarCategorias.css";


function NavbarCategorias() {


  return (

    <nav className="navbar-categorias">


      <div className="menu">



        <div className="dropdown">


          <button className="dropdown-btn">


            <FaMicrochip />

            Componentes

            <span>
              ▾
            </span>


          </button>




          <div className="dropdown-menu">


            <Link to="/procesadores">
              Procesadores
            </Link>


            <Link to="/placas-video">
              Placas de Video
            </Link>


            <Link to="/placas-madre">
              Placas Madre
            </Link>


            <Link to="/memorias">
              Memorias RAM
            </Link>


            <Link to="/almacenamiento">
              SSD / HDD
            </Link>


            <Link to="/gabinetes">
              Gabinetes
            </Link>


            <Link to="/fuentes">
              Fuentes
            </Link>


            <Link to="/coolers">
              Refrigeración
            </Link>


            <Link to="/monitores">
              Monitores
            </Link>


            <Link to="/teclados">
              Teclados
            </Link>


            <Link to="/mouse">
              Mouse
            </Link>


            <Link to="/auriculares">
              Auriculares
            </Link>



          </div>


        </div>





        <Link to="/arma-tu-pc">


          <FaScrewdriverWrench />


          Armá tu PC


        </Link>






        <Link to="/ofertas">


          <FaFire />


          Ofertas


        </Link>






        <Link to="/novedades">


          <FaStar />


          Novedades


        </Link>



      </div>


    </nav>


  );

}


export default NavbarCategorias;