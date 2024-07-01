"use strict";

const tbody = document.getElementById("table-body");

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

function Location(
  locationName,
  minClientPerHour,
  maxClientPerHour,
  agvCookiePerSale,
  cookieEachHour
) {
  this.locationName = locationName;
  this.minClientPerHour = minClientPerHour;
  this.maxClientPerHour = maxClientPerHour;
  this.agvCookiePerSale = agvCookiePerSale;
  this.cookieEachHour = cookieEachHour; // Esto es el el estimate
}

Location.prototype.render = function () {
  const storeTr = document.createElement("tr");
  const storeTd = document.createElement("td");
  storeTd.textContent = this.locationName;
  storeTr.appendChild(storeTd);
  tbody.appendChild(storeTr);

  for (let k = 0; k < hours.length; k++) {
    const hoursTd = document.createElement("td");
    storeTr.appendChild(hoursTd);
  }

  const totalTd = document.createElement("td");

  storeTr.appendChild(totalTd);
};

Location.prototype.estimate = function () {
  this.cookieEachHour = estimateSale(this);
};

const seattle = new Location("Seattle", 23, 65, 6.3, []);
const tokio = new Location("Tokio", 3, 24, 1.2, []);
const dubai = new Location("Dubai", 11, 38, 3.7, []);
const paris = new Location("Paris", 20, 38, 2.3, []);
const lima = new Location("Lima", 2, 16, 4.6, []);

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

seattle.render();
tokio.render();
dubai.render();
paris.render();
lima.render();

const stores = [seattle, tokio, dubai, paris, lima];

const hederRowContainer = document.getElementById("header-row-container");
for (let i = 0; i < hours.length; i++) {
  const th = document.createElement("th");
  th.textContent = hours[i];
  hederRowContainer.appendChild(th);
}
const thExtra = document.createElement("th");
thExtra.textContent = "Total";
hederRowContainer.appendChild(thExtra);
