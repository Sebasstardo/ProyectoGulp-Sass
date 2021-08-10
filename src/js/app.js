document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
});

function navegacionFija() {
  const barra = document.querySelector(".header");

  //Registrar el interccion observer
  const observer = new IntersectionObserver(function (entries) {
    // console.log(entries[0]);
    if (entries[0].isIntersecting) {
      // console.log("elemento visible");
      barra.classList.remove("fijo");
    } else {
      // console.log("elemento no visible");

      barra.classList.add("fijo");
    }
  });
  //Elemento a observar
  observer.observe(document.querySelector(".contenido-video"));
}
