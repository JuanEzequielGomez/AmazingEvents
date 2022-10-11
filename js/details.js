let urlParametros = location.search;
let parametros = new URLSearchParams(urlParametros);
let id = parametros.get("_id");

let filtro = data.events.filter((e) => {
  return e._id;
});

let resultado = filtro.find((e) => e._id == id);
mostrarCartas(resultado);

function mostrarCartas(e) {
  let cartas = assistanceOrEstimate() 
function assistanceOrEstimate(){
  if(e.assistance == undefined){
  return `Estimate: ${e.estimate}`
  }else{
    return `Assistance: ${e.assistance}`
  }
}

  let contenedor = document.getElementById("details");
  contenedor.innerHTML = "";
  let div = document.createElement("div");
  div.className = "card-details d-flex justify-content-center align-items-center flex-wrap"
  div.style.maxwidth = "80%";
  div.style.minHeight = "20rem";
  div.style.padding = "0.5rem";
  div.innerHTML = `<div class="card-detail d-flex">
    <div class="img-detail-container d-flex flex-wrap justify-content-center">
      <img src="${e.image}" class="img-detail" alt="eventimage">
    </div>
      <div class="card-body-detail d-flex flex-column flex-wrap justify-content-center">
        <h5 class="card-title-detail"> ${e.name}</h5>
        <p class="card-text-detail1"> ${e.description}</p>
        <p class="card-text-detail">Date: ${e.date}</p>
        <p class="card-text-detail">Place: ${e.place}</p>
        <p class="card-text-detail">Capacity: ${e.capacity}</p>
        <p class="card-text-detail">${cartas}</p>
        <p class="card-price-detail">Price: $${e.price}</p>
      </div>
    </div>
    `;
  contenedor.appendChild(div);
}

