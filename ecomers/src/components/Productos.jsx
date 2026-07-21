import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import "./Productos.css";

const API_URL = "/api/productos";


function Productos({ agregarAlCarrito }) {


  const [productos, setProductos] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState(null);



  const [busqueda, setBusqueda] = useState("");

  const [categoria, setCategoria] = useState("Todas");

  const [precioMin, setPrecioMin] = useState("");

  const [precioMax, setPrecioMax] = useState("");

  const [orden, setOrden] = useState("");





  useEffect(() => {


    async function cargarProductos(){


      try {


        setCargando(true);

        setError(null);



        const respuesta = await fetch(API_URL);



        if(!respuesta.ok){

          throw new Error(
            "No se pudieron cargar los productos"
          );

        }



        const data = await respuesta.json();



        setProductos(
          Array.isArray(data)
          ? data
          : []
        );


      } catch(error){


        console.error(error);

        setError(error.message);


      } finally{


        setCargando(false);


      }


    }


    cargarProductos();


  }, []);







  const categorias = useMemo(()=>{


    return [

      "Todas",

      ...new Set(
        productos.map(
          producto=>producto.categoria
        )
      )

    ];


  },[productos]);







  const limpiarFiltros = ()=>{


    setBusqueda("");

    setCategoria("Todas");

    setPrecioMin("");

    setPrecioMax("");

    setOrden("");


  };







  const productosOrdenados = useMemo(()=>{


    let resultado = productos.filter(producto=>{


      const nombre =
      producto.nombre
      ?.toLowerCase()
      || "";



      const texto =
      busqueda
      .toLowerCase();




      const coincideNombre =
      nombre.includes(texto);




      const coincideCategoria =
      categoria==="Todas"
      ||
      producto.categoria===categoria;





      const coincideMin =
      precioMin===""

      ||

      producto.precio >= Number(precioMin);





      const coincideMax =
      precioMax===""

      ||

      producto.precio <= Number(precioMax);




      return (

        coincideNombre &&
        coincideCategoria &&
        coincideMin &&
        coincideMax

      );


    });






    if(orden==="mayor"){

      resultado.sort(
        (a,b)=>b.precio-a.precio
      );

    }



    if(orden==="menor"){

      resultado.sort(
        (a,b)=>a.precio-b.precio
      );

    }



    return resultado;



  },[
    productos,
    busqueda,
    categoria,
    precioMin,
    precioMax,
    orden
  ]);








  return (

    <section className="productos-container">


      <header className="productos-header">


        <h1>
          Componentes de PC
        </h1>


        <p className="subtitulo-productos">

          Encontrá procesadores, placas de video,
          memorias y todo lo necesario para armar
          tu PC ideal.

        </p>


      </header>





      <div className="filtros">



        <input

          className="buscador"

          type="text"

          placeholder="🔍 Buscar producto..."

          value={busqueda}

          onChange={
            e=>setBusqueda(e.target.value)
          }

        />





        <select

          value={categoria}

          onChange={
            e=>setCategoria(e.target.value)
          }

        >


          {
            categorias.map(cat=>(


              <option

                key={cat}

                value={cat}

              >

                {cat}

              </option>


            ))
          }


        </select>






        <input

          type="number"

          placeholder="Precio mínimo"

          value={precioMin}

          onChange={
            e=>setPrecioMin(e.target.value)
          }

        />





        <input

          type="number"

          placeholder="Precio máximo"

          value={precioMax}

          onChange={
            e=>setPrecioMax(e.target.value)
          }

        />







        <select

          value={orden}

          onChange={
            e=>setOrden(e.target.value)
          }

        >

          <option value="">
            Ordenar por precio
          </option>


          <option value="mayor">
            Mayor precio
          </option>


          <option value="menor">
            Menor precio
          </option>


        </select>







        <button

          className="btn-limpiar"

          onClick={limpiarFiltros}

        >

          ↻ Limpiar

        </button>



      </div>







      {
        cargando &&

        <p className="estado-carga">
          Cargando productos...
        </p>

      }






      {
        error && !cargando &&

        <p className="estado-error">

          Error:
          {error}

        </p>

      }







      {
        !cargando &&
        !error &&


        <div className="grid-productos">


          {

          productosOrdenados.length===0

          ?

          (

            <h2>
              No se encontraron productos
            </h2>

          )


          :


          productosOrdenados.map(producto=>(


            <ProductCard

              key={producto.id}

              producto={producto}

              agregarAlCarrito={agregarAlCarrito}

            />


          ))


          }


        </div>


      }



    </section>

  );

}


export default Productos;