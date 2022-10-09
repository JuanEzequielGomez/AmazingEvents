console.log(data)

let contenedorDatos = document.getElementById('contenedor-datos')

for (let i = 0; i < data.eventos.length; i++) {
    let card = document.createElement('div')
    card.className="card"
    card.style.width="18rem"
    card.innerHTML=`<img src="${data.eventos[i].image}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column justify-content-between text-center">
      <h5 class="card-title">${data.eventos[i].name}</h5>
      <p class="card-text">${data.eventos[i].description}</p>
      <p class="card-text">${data.eventos[i].place}</p>
      <div class="d-flex justify-content-between p-4">
        <p class="card-price">price: €${data.eventos[i].price}</p>
        <a href="./details.html" class="btn btn-primary">More info</a>
      </div>
    </div>`
    contenedorDatos.appendChild(card)
}