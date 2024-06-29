"use strict";

function Location(
  locationName,
  address,
  contactoInfo,
  workingHours,
  minClientPerHour,
  maxClientPerHour,
  agvCookiePerSale,
  cookieEachHour
) {
  this.locationName = locationName;
  this.address = address;
  this.contactoInfo = contactoInfo;
  this.workingHours = workingHours;
  this.minClientPerHour = minClientPerHour;
  this.maxClientPerHour = maxClientPerHour;
  this.agvCookiePerSale = agvCookiePerSale;
  this.cookieEachHour = cookieEachHour; // Esto es el el estimate
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
  6.3,
  []
);
const tokio = new Location(
  "tokio",
  "1 Chome-1-2 Oshiage, Sumida City, Tokyo",
  "444-444-444",
  "6am-7pm",
  3,
  24,
  1.2,
  []
);
const dubai = new Location(
  "dubai",
  "1 Sheinkh Mohammed Bin Rashid Bvld -Dubai",
  "333-333-333",
  "6am-7pm",
  11,
  38,
  3.7,
  []
);
const paris = new Location(
  "paris",
  "Champ de Mars, 5 Avenue France, 7005, Paris",
  "222-222-222",
  "6am-7pm",
  20,
  38,
  2.3,
  []
);
const lima = new Location(
  "lima",
  "Ca. Gral. Borgoña cuadra 8, Miraflores, 15074, Lima",
  "111-111-111",
  "6am-7pm",
  2,
  16,
  4.6,
  []
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
    stores[i].estimate();
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
    stores[i].estimate();
    renderIndex(stores[i]);
  }
}
