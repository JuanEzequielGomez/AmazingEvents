let contenedorDatosPast = document.getElementById('contenedor-datos-past')
let contenedorCategorias = document.getElementById("contenedor-categorias");

let eventosData = data.events;
let barraBusqueda = "";
let checkboxesEnArray = [""];
let fechaActual=data.currentDate;

// ----------------------------------------------- FUNCIONES ----------------------------------------------

// ----------------------------------------------- MOSTRAR CARTAS ----------------------------------------------

function mostrarCartas(cartas) {
  let agregar = "";

  if (cartas.length > 0) {
    cartas.forEach((e) => {
      agregar+= `
      <div class="card text-center">
      <img src=${e.image} class="card-img-top img-card" alt="${e.name}">
      <div class="card-body">
        <h5 class="card-title">${e.name}</h5>
        <p class="card-text">${e.description}</p>
        <div class="card-price d-flex justify-content-center align-content-center align-items-center gap-3">
          <div>Price €${e.price}</div>
          <a href="./details.html?_id=${e._id}" class="btn btn-primary">More info</a>
        </div>
      </div>
  </div>`;
      
    contenedorDatosPast.innerHTML = agregar;

    });
  } else {
    contenedorDatosPast.innerHTML = `<div class="error"><img class="error-img" src="../assets/imgs/404_2.png" alt="error 404"></div>`;

  }
}

// ----------------------------------------------- CHECKBOXS ----------------------------------------------
checkboxes();
function checkboxes() {
  let categoriasEnArray = [];
  data.events.forEach((e) => {
    if (!categoriasEnArray.includes(e.category)) {
      categoriasEnArray.push(e.category);
    }
  });
  categoriasEnArray.forEach((categoria) => {
    let contenedorDiv = document.createElement("div");
    contenedorDiv.className = "checkboxes";
    contenedorDiv.innerHTML = `<input type="checkbox" name="${categoria}" id="${
      categoria.split(" ")[0]
    }" value="${categoria}">
      <label for="${categoria.replace(" ", "-")}">${categoria}</label>`;
    contenedorCategorias.appendChild(contenedorDiv);
  });
}

// ----------------------------------------------- CHEQUEO ----------------------------------------------

contenedorCategorias.addEventListener("change", () => {
  chequeo();
});

chequeo();
function chequeo() {
  let checkbox = document.querySelectorAll("input[type=checkbox]");
  checkboxesEnArray = Array.from(checkbox).filter((check) => check.checked).map((check) => check.value);


  superFiltro();
  return checkboxesEnArray;
}

// ----------------------------------------------- BARRA DE BÚSQUEDA ----------------------------------------------

busqueda();
function busqueda() {
  let form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  
  let buscadorPrincipal = document.getElementById("buscador");
  buscadorPrincipal.addEventListener("keyup", (e) => {
    let entrada = e.target.value;
    barraBusqueda = entrada.toLowerCase();
    superFiltro();
  });
  return barraBusqueda;
}

// ----------------------------------------------- FILTRO POR FECHA ----------------------------------------------


function date(fechaEvento, fechaComparacion){
  return (fechaEvento<fechaComparacion)
}

// ----------------------------------------------- SUPERFILTRO ----------------------------------------------

function superFiltro() {
  filtroEnArray = [];

  if (checkboxesEnArray.length == 0 && barraBusqueda == "") {
    filtroEnArray.push(eventosData.filter(e => date(e.date, fechaActual)))
  } 

   if (checkboxesEnArray.length > 0 && barraBusqueda !== "") {
    checkboxesEnArray.forEach((categoria) => {
      filtroEnArray.push(eventosData.filter((e) =>e.name.toLowerCase().includes(barraBusqueda.trim()) && e.category == categoria && date(e.date, fechaActual)));
    });
  } 

   if (checkboxesEnArray.length > 0 && barraBusqueda == "") {
    checkboxesEnArray.forEach((categoria) => {
      filtroEnArray.push(eventosData.filter((e) => e.category == categoria && date(e.date, fechaActual)));
    });
  } 

   if (checkboxesEnArray.length == 0 && barraBusqueda !== "") {
    filtroEnArray.push(eventosData.filter((e) =>e.name.toLowerCase().includes(barraBusqueda.trim()) && date(e.date, fechaActual)));
  }

  mostrarCartas(filtroEnArray.flat());
}