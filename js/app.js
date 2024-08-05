"use strict";

const tbody = document.getElementById("table-body");
const formNewStore = document.getElementById("newStore");

function Location(
  locationName,
  address,
  contactoInfo,
  workingHours,
  minClientPerHour,
  maxClientPerHour,
  agvCookiePerSale
) {
  this.locationName = locationName;
  this.address = address;
  this.contactoInfo = contactoInfo;
  this.workingHours = workingHours;
  this.minClientPerHour = minClientPerHour;
  this.maxClientPerHour = maxClientPerHour;
  this.agvCookiePerSale = agvCookiePerSale;
  this.cookieEachHour = []; // Esto es el el estimate
}

Location.prototype.estimate = function () {
  this.cookieEachHour = estimateSale(this); // esto hace referencia y toma los valores de el sale
};

const seattle = new Location(
  "seattle",
  "2901 3rd Ave #300, Seattle,Wa 98121",
  "555-555-555",
  "6am-7pm",
  23,
  65,
  6.3
);
const tokio = new Location(
  "tokio",
  "1 Chome-1-2 Oshiage, Sumida City, Tokyo",
  "444-444-444",
  "6am-7pm",
  3,
  24,
  1.2
);
const dubai = new Location(
  "dubai",
  "1 Sheinkh Mohammed Bin Rashid Bvld -Dubai",
  "333-333-333",
  "6am-7pm",
  11,
  38,
  3.7
);
const paris = new Location(
  "paris",
  "Champ de Mars, 5 Avenue France, 7005, Paris",
  "222-222-222",
  "6am-7pm",
  20,
  38,
  2.3
);
const lima = new Location(
  "lima",
  "Ca. Gral. Borgoña cuadra 8, Miraflores, 15074, Lima",
  "111-111-111",
  "6am-7pm",
  2,
  16,
  4.6
);

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];
const stores = [seattle, tokio, dubai, paris, lima];

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function estimateSale(store) {
  const sale = [];
  for (let i = 0; i < hours.length; i++) {
    const numCustomers = random(store.minClientPerHour, store.maxClientPerHour);
    const hoursSale = Math.ceil(numCustomers * store.agvCookiePerSale);
    sale.push(hoursSale);
  }
  return sale;
}

Location.prototype.render = function () {
  const storeTr = document.createElement("tr");
  const storeTd = document.createElement("td");
  storeTd.textContent = this.locationName;
  storeTr.appendChild(storeTd);
  tbody.appendChild(storeTr);

  let total = 0;

  for (let k = 0; k < hours.length; k++) {
    const hoursTd = document.createElement("td");

    this.estimate();
    hoursTd.textContent = this.cookieEachHour[k];
    storeTr.appendChild(hoursTd);
    total += this.cookieEachHour[k];
  }

  const totalTd = document.createElement("td");
  totalTd.textContent = total;
  storeTr.appendChild(totalTd);
};

 function render(store) {
 let total = 0;

  const root = document.getElementById("root");
  const location = document.createElement("section");
   location.classList.add("location");
 root.appendChild(location);
   const tittle = document.createElement("h2");
   tittle.textContent = store.locationName;
   location.appendChild(tittle);
  const list = document.createElement("ul");
  location.appendChild(list);

  for (let i = 0; i < hours.length; i++) {
    total += store.cookieEachHour[i];
     const listItem = document.createElement("li");
   listItem.textContent =
       hours[i] + ":" + store.cookieEachHour[i] + " cookies";
     list.appendChild(listItem);
   }
   const totaItem = document.createElement("li");
   totaItem.textContent = "total" + total + " cookies";
   list.appendChild(totaItem);
}

 function runAplication() {
   for (let i = 0; i < stores.length; i++) {
    render(stores[i]);
  }
 }

function renderIndex(params) {
 const fill = document.getElementById("fill");
  const location = document.createElement("section");
  location.classList.add("location");
  fill.appendChild(location);
  const tittle = document.createElement("h2");
 tittle.textContent = params.locationName;
  location.appendChild(tittle);
  const address = document.createElement("p");
   address.textContent = "Location: " + params.address;
  location.appendChild(address);
   const contactoInfo = document.createElement("p");
  contactoInfo.textContent = "Contacto: " + params.contactoInfo;
  location.appendChild(contactoInfo);
   const workingHours = document.createElement("p");
  workingHours.textContent = "Horario: " + params.workingHours;
  location.appendChild(workingHours);
 }

 function run(params) {
  for (let i = 0; i < stores.length; i++) {
     renderIndex(stores[i]);
   }
 }

seattle.render();
tokio.render();
dubai.render();
paris.render();
lima.render();

const hederRowContainer = document.getElementById("header-row-container");
for (let i = 0; i < hours.length; i++) {
  const th = document.createElement("th");
  th.textContent = hours[i];
  hederRowContainer.appendChild(th);
}
const thExtra = document.createElement("th");
thExtra.textContent = "Total";
hederRowContainer.appendChild(thExtra);

formNewStore.addEventListener("submit", function (e) {
  // event contiene toda la información del formulario como también contiene
  // funciones de este, donde una de esas funciones me permite evitar
  // que al hacer submit la web se recargue
  // preventDefault()
  e.preventDefault();
  const loc = e.target.locationName.value;
  const min = parseInt(e.target.minClientPerHour.value);
  const max = parseInt(e.target.maxClientPerHour.value);
  const avg = parseInt(e.target.agvCookiePerSale.value);

  const newStores = new Location(loc, min, max, avg);
  stores.push(newStores);

  Location.render();
  console.log(Location.cookieEachHour);

  // //event.target es un array que contiene todos los elementos de nuestro formulario
  // for (let i = 0; i < event.target.length; i++) {
  //   // console.log(typeof event.target[i].name);
  //   // Si name no es vacio entonces imprime en consola el valor
  //   // sql: <>
  //   if (event.target[i].name !== "") {
  //     // datosDeAdopcion[event.target[i].name] = event.target[i].value;
  //     newStores[event.target[i].name] = event.target[i].value;
  //     console.log(event.target[i].name);
  //   }
  // }
  // newStore.push(newStores);
});
