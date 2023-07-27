const apiURL = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7b926469d6bf4ee683361fc52bb6457c';
const supportedCurrenciesURL = 'https://api.currencyfreaks.com/v2.0/supported-currencies';

function filterCurrencies(input, dropdown) {
  const filterValue = input.value.toLowerCase();
  const options = dropdown.getElementsByTagName("option");

  for (let i = 0; i < options.length; i++) {
    const text = options[i].textContent || options[i].innerText;
    const shouldDisplay = text.toLowerCase().indexOf(filterValue) > -1;
    options[i].style.display = shouldDisplay ? "" : "none";
  }
}




async function getSupportedCurrencies() {
  try {
    const response = await fetch(supportedCurrenciesURL);
    const data = await response.json();

    if (data && data.supportedCurrenciesMap) {
      const supportedCurrencies = data.supportedCurrenciesMap;
      const fromCurrencyDropdown = document.getElementById("fromCurrency");
      const toCurrencyDropdown = document.getElementById("toCurrency");

      for (const currencyCode in supportedCurrencies) {
        if (supportedCurrencies.hasOwnProperty(currencyCode)) {
          const currencyName = supportedCurrencies[currencyCode].currencyName;
          const option = document.createElement("option");
          option.value = currencyCode;
          option.textContent = `${currencyCode} - ${currencyName}`;
          fromCurrencyDropdown.appendChild(option);

          const optionClone = option.cloneNode(true);
          toCurrencyDropdown.appendChild(optionClone);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching supported currencies:', error);
  }
}


async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  if (fromCurrency === toCurrency) {
    document.getElementById("result").textContent = "Result: " + amount.toFixed(2) + " " + toCurrency;
    return;
  }

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data && data.rates) {
      const rates = data.rates;

      if (rates.hasOwnProperty(fromCurrency) && rates.hasOwnProperty(toCurrency)) {
        const result = (amount / rates[fromCurrency]) * rates[toCurrency];
        document.getElementById("result").textContent = "Result: " + result.toFixed(2) + " " + toCurrency;
      } else {
        alert("Selected currencies are not supported.");
      }
    }
  } catch (error) {
    console.error('Error fetching currency rates:', error);
  }
}

getSupportedCurrencies();


const searchCurrency = document.getElementById("searchCurrency");
const fromCurrencyDropdown = document.getElementById("fromCurrency");
const toCurrencyDropdown = document.getElementById("toCurrency");

searchCurrency.addEventListener("input", () => {
  filterCurrencies(searchCurrency, fromCurrencyDropdown);
  filterCurrencies(searchCurrency, toCurrencyDropdown);
});






const apiUrl = 'https://api.currencyfreaks.com/v2.0/supported-currencies';


let currenciesData;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    currenciesData = data.supportedCurrenciesMap;
    displayCurrencyData(currenciesData, 20);
  })
  .catch(error => console.error('Error fetching data:', error));

function displayCurrencyData(currenciesMap, numToShow) {
  const currencyListDiv = document.getElementById('content');
  currencyListDiv.innerHTML = '';

  const currenciesToShow = Object.values(currenciesMap).slice(0, numToShow);

  currenciesToShow.forEach(currency => {
    const currencyDiv = document.createElement('row');
    currencyDiv.style.border = '1px solid #ccc';
    currencyDiv.style.padding = '10px';
    currencyDiv.style.margin = '5px';

    const iconImg = document.createElement('img');
    iconImg.src = currency.icon;
    iconImg.style.width = '30px';
    iconImg.style.height = '30px';
    iconImg.style.marginRight = '10px';

    const currencyName = document.createElement('span');
    currencyName.textContent = currency.currencyName;

    const currencyCode = document.createElement('span');
    currencyCode.textContent = '(' + currency.currencyCode + ')';

    const countryName = document.createElement('span');
    countryName.textContent = 'Country: ' + currency.countryName;

    const status = document.createElement('span');
    status.textContent = 'Status: ' + currency.status;

    const availableFrom = document.createElement('span');
    availableFrom.textContent = 'Available From: ' + currency.availableFrom;

    const availableUntil = document.createElement('span');
    availableUntil.textContent = 'Available Until: ' + currency.availableUntil;

    currencyDiv.appendChild(iconImg);
    currencyDiv.appendChild(currencyName);
    currencyDiv.appendChild(currencyCode);
    currencyDiv.appendChild(document.createElement('br'));
    currencyDiv.appendChild(countryName);
    currencyDiv.appendChild(document.createElement('br'));


    currencyListDiv.appendChild(currencyDiv);
  });
}



let isShowingAll = false;

function viewAll() {
  const currencyListDiv = document.getElementById('content');
  currencyListDiv.innerHTML = '';

  const button = document.getElementById('viewAllButton');

  if (!isShowingAll) {
    button.innerHTML = 'Hide <i class="fa-solid fa-eye-slash"></i>';
    Object.values(currenciesData).forEach(currency => {
      const currencyDiv = document.createElement('row');
      currencyDiv.style.border = '1px solid #ccc';
      currencyDiv.style.padding = '10px';
      currencyDiv.style.margin = '5px';

      const iconImg = document.createElement('img');
      iconImg.src = currency.icon;
      iconImg.style.width = '30px';
      iconImg.style.height = '30px';
      iconImg.style.marginRight = '10px';

      const currencyName = document.createElement('span');
      currencyName.textContent = currency.currencyName;

      const currencyCode = document.createElement('span');
      currencyCode.textContent = '(' + currency.currencyCode + ')';

      const countryName = document.createElement('span');
      countryName.textContent = 'Country: ' + currency.countryName;

      const status = document.createElement('span');
      status.textContent = 'Status: ' + currency.status;

      const availableFrom = document.createElement('span');
      availableFrom.textContent = 'Available From: ' + currency.availableFrom;

      const availableUntil = document.createElement('span');
      availableUntil.textContent = 'Available Until: ' + currency.availableUntil;

      currencyDiv.appendChild(iconImg);
      currencyDiv.appendChild(currencyName);
      currencyDiv.appendChild(currencyCode);
      currencyDiv.appendChild(document.createElement('br'));
      currencyDiv.appendChild(countryName);
      currencyDiv.appendChild(document.createElement('br'));


      currencyListDiv.appendChild(currencyDiv);
    });
  } else {
    button.innerHTML = 'View All <i class="fa-solid fa-angles-right"></i>';
    displayCurrencyData(currenciesData, 20);

  }


  isShowingAll = !isShowingAll;
}





async function fetchAndDisplayExchangeRates() {
  const apiURL = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7b926469d6bf4ee683361fc52bb6457c';

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (response.ok) {

      const date = data.date.split(' ')[0];
      const baseCurrency = data.base;
      const rates = data.rates;


      const allCurrencies = Object.keys(rates).filter(currency => currency !== baseCurrency);
      const totalCurrencies = allCurrencies.length;


      const currenciesPerTable = Math.ceil(totalCurrencies / 3);


      const table1Currencies = allCurrencies.slice(0, currenciesPerTable);
      const table2Currencies = allCurrencies.slice(currenciesPerTable, currenciesPerTable * 2);
      const table3Currencies = allCurrencies.slice(currenciesPerTable * 2);

      let table1Html = `<table class="table1 table" id="table1"><tr><th>Currency</th><th>Rate</th></tr>`;
      let table2Html = `<table class="table2 table" id="table2"><tr><th>Currency</th><th>Rate</th></tr>`;
      let table3Html = `<table class="table3 table" id="table3"><tr><th>Currency</th><th>Rate</th></tr>`;


      for (const currency of table1Currencies) {
        const rate = rates[currency];
        table1Html += `<tr><td>${currency}</td><td>${rate}</td></tr>`;
      }

      for (const currency of table2Currencies) {
        const rate = rates[currency];
        table2Html += `<tr><td>${currency}</td><td>${rate}</td></tr>`;
      }

      for (const currency of table3Currencies) {
        const rate = rates[currency];
        table3Html += `<tr><td>${currency}</td><td>${rate}</td></tr>`;
      }

      table1Html += '</table>';
      table2Html += '</table>';
      table3Html += '</table>';

      const exchangeRatesDiv = document.getElementById('exchange-rates');
      exchangeRatesDiv.innerHTML = `
            <div class="title">
            <p id="base">Base Currency: <span>${baseCurrency}</span></p>
            <p id="date">Date: ${date}</p>
            
            <p id="time">Time: ${new Date().toLocaleTimeString()}</p>
           
            </div>
            <div class="container">
              ${table1Html}
              ${table2Html}
              ${table3Html}
            </div>`;
    } else {
      console.error('Error fetching data:', data.error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


fetchAndDisplayExchangeRates();

let isClicked = false;
function viewAllRates() {
  const table2 = document.getElementById("table2");
  const table3 = document.getElementById("table3");
  const btn = document.getElementById("viewAllBtn");

  if (!isClicked) {

    table2.style.display = "block";
    table3.style.display = "block";
    btn.innerHTML = 'Hide <i class="fa-solid fa-eye-slash">';

  } else {
    table2.style.display = "none";
    table3.style.display = "none";
    btn.innerHTML = 'View All <i class="fa-solid fa-angles-right">';
  }
  isClicked = !isClicked;



}