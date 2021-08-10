document.addEventListener("DOMContentLoaded", function () {
  crearGaleria();
});

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("IMG");

    imagen.src = `build/img/thumb/${i}.webp`;

    //crea un atributo personalizado a la imagen
    imagen.dataset.imagenId = i;

    //Añadir la funcion de mostrarImagen
    imagen.onclick = mostrarImagen;

    const lista = document.createElement("LI");
    lista.appendChild(imagen);

    galeria.appendChild(lista);
  }
}

function mostrarImagen(e) {
  //   console.log(e.target.dataset.imagenId);

  const id = parseInt(e.target.dataset.imagenId);

  const imagen = document.createElement("IMG");
  imagen.src = `build/img/grande/${id}.webp`;

  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  //Cuando se da click cerrar la imagen
  overlay.onclick = function () {
    overlay.remove();
  };

  //Boton para cerrar la imagen
  const cerrarImg = document.createElement("P");
  cerrarImg.textContent = "X";
  cerrarImg.classList.add("btn-cerrar");

  //Cuando se presiona cierra la imagen
  cerrarImg.onclick = function () {
    overlay.remove();
  };

  overlay.appendChild(cerrarImg);

  //mostrar en el html
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
