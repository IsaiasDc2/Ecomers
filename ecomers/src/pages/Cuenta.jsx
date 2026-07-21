import { useState } from "react";

import SidebarCuenta from "../components/SidebarCuenta";
import Login from "../components/Login";
import Registro from "../components/Registro";

import "./Cuenta.css";


function Cuenta() {


  const [vista, setVista] = useState("login");



  return (

    <div className="cuenta">


      <SidebarCuenta

        vista={vista}

        setVista={setVista}

      />




      <div className="contenido">



        {
          vista === "login" && (

            <Login />

          )
        }




        {
          vista === "registro" && (

            <Registro />

          )
        }





        {
          vista === "pedidos" && (

            <div className="panel-cuenta">

              <h2>
                Mis pedidos
              </h2>


              <p>
                Todavía no tenés pedidos realizados.
              </p>


            </div>

          )
        }





        {
          vista === "favoritos" && (

            <div className="panel-cuenta">


              <h2>
                Mis favoritos
              </h2>


              <p>
                No tenés productos favoritos.
              </p>


            </div>

          )
        }



      </div>



    </div>

  );

}


export default Cuenta;