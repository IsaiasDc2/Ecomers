function elegirProducto(producto){

  const existe = pc[categoriaActual].find(
    item => item.id === producto.id
  );


  if(existe){

    return;

  }


  setPC({

    ...pc,

    [categoriaActual]:[
      ...pc[categoriaActual],
      producto
    ]

  });


}