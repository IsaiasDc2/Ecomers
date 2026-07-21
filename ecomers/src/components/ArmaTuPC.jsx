import { useEffect, useState } from "react";
import "./ArmaTuPC.css";

const API = "/api/productos";

const pasos = [
  "Procesador",
  "Motherboard",
  "Memoria RAM",
  "Almacenamiento",
  "Placa de video",
  "Fuente",
  "Gabinete",
];


function ArmaTuPC({ agregarAlCarrito }) {


  const [productos,setProductos] = useState([]);

  const [paso,setPaso] = useState(0);



  const [pc,setPC] = useState({

    Procesador:[],
    Motherboard:[],
    "Memoria RAM":[],
    Almacenamiento:[],
    "Placa de video":[],
    Fuente:[],
    Gabinete:[]

  });



  useEffect(()=>{


    fetch(API)

    .then(res=>res.json())

    .then(data=>{

      // La API puede devolver el array directo (json-server)
      // o un objeto { productos: [...] }. Cubrimos los dos casos.
      setProductos(Array.isArray(data) ? data : data.productos ?? []);

    })

    .catch(err=>{

      console.error("Error cargando productos:", err);
      setProductos([]); // evita que productos quede undefined

    });


  },[]);





  const categoriaActual = pasos[paso];





  // FILTRO DE COMPATIBILIDAD

  const productosDisponibles = (productos ?? []).filter(producto=>{


    if(producto.categoria !== categoriaActual)
      return false;



    // compatibilidad procesador - mother

    if(
      categoriaActual==="Motherboard" &&
      pc.Procesador.length>0
    ){

      return (
        producto.especificaciones?.socket ===
        pc.Procesador[0].especificaciones?.socket
      );

    }





    // compatibilidad RAM

    if(
      categoriaActual==="Memoria RAM" &&
      pc.Motherboard.length>0
    ){


      return (
        producto.especificaciones?.tipo ===
        pc.Motherboard[0]
        .especificaciones
        ?.memoriaMaxima
        ?.split(" ")[1]
      );


    }




    return true;


  });







  function elegirProducto(producto){


    const existe =
    pc[categoriaActual]
    .some(
      item=>item.id===producto.id
    );



    if(existe){


      setPC({

        ...pc,

        [categoriaActual]:

        pc[categoriaActual]
        .filter(
          item=>item.id!==producto.id
        )


      });


    }

    else{


      setPC({

        ...pc,

        [categoriaActual]:

        [
          ...pc[categoriaActual],
          producto
        ]

      });


    }


  }






  function quitar(categoria,id){


    setPC({

      ...pc,

      [categoria]:

      pc[categoria]
      .filter(
        item=>item.id!==id
      )

    });


  }





  function siguiente(){

    if(paso < pasos.length-1){

      setPaso(paso+1);

    }

  }




  function anterior(){

    if(paso>0){

      setPaso(paso-1);

    }

  }







  function saltar(){


    const confirmar =
    window.confirm(
      "¿Seguro que quieres saltar este paso?"
    );


    if(confirmar){

      siguiente();

    }


  }







  const total = Object.values(pc)

  .flat()

  .reduce(

    (total,item)=>
    total + item.precio,

    0

  );







  function agregarPC(){



    const computadora = {


      id:"pc-"+Date.now(),

      nombre:"🖥️ PC Gamer Armada",

      precio:total,

      cantidad:1,

      componentes:pc


    };



    agregarAlCarrito(computadora);


    alert(
      "PC agregada al carrito"
    );


  }







return (

<div className="arma-container">





<h1>
🖥️ Armá tu PC
</h1>





<div className="progreso">


{

pasos.map((item,index)=>(


<button

key={item}

className={
paso===index
?
"activo"
:
""
}


onClick={()=>setPaso(index)}

>


{index+1}


</button>


))


}


</div>






<h2>

Elegí tu {categoriaActual}

</h2>






<div className="productos-armado">


{

productosDisponibles.length === 0 &&

<p className="sin-productos">

No hay productos disponibles para esta categoría
(o que sean compatibles con lo que ya elegiste).

</p>

}


{


productosDisponibles.map(producto=>{


const seleccionado =

pc[categoriaActual]

.some(

item=>item.id===producto.id

);




return (

<div

key={producto.id}

className={

seleccionado

?

"componente seleccionado"

:

"componente"

}


onClick={()=>
elegirProducto(producto)
}


>


<img

src={producto.imagen}

alt={producto.nombre}

/>



<h3>

{producto.nombre}

</h3>



<p>

${producto.precio.toLocaleString("es-AR")}

</p>




{
seleccionado &&
<span>
✔ Seleccionado
</span>
}



</div>


)


})


}



</div>






<div className="botones">


<button

disabled={paso===0}

onClick={anterior}

>

⬅ Atrás

</button>



<button

className="saltar"

onClick={saltar}

>

Saltar paso

</button>




<button

onClick={siguiente}

>

Siguiente ➡

</button>


</div>








<div className="resumen">


<h2>
Resumen de PC
</h2>



{

Object.entries(pc)

.map(([categoria,items])=>(


<div

className="item-resumen"

key={categoria}

>


<strong>
{categoria}
</strong>



{

items.length ?

items.map(item=>(


<div key={item.id}>


{item.nombre}


<button

onClick={()=>
quitar(categoria,item.id)
}

>
❌
</button>


</div>


))


:

<span>
Sin elegir
</span>


}



</div>


))


}




<h2>

Total:

${total.toLocaleString("es-AR")}

</h2>



<button

className="btn-carrito-pc"

onClick={agregarPC}

>

🛒 Agregar PC al carrito

</button>




</div>






</div>


);


}



export default ArmaTuPC;
