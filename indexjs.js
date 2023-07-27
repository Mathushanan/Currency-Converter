const apiURL = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7b926469d6bf4ee683361fc52bb6457c';
    const supportedCurrenciesURL = 'https://api.currencyfreaks.com/v2.0/supported-currencies';

    // Function to handle filtering of the "from" and "to" select dropdowns
    function filterCurrencies(input, dropdown) {
      const filterValue = input.value.toLowerCase();
      const options = dropdown.getElementsByTagName("option");

      for (let i = 0; i < options.length; i++) {
        const text = options[i].textContent || options[i].innerText;
        const shouldDisplay = text.toLowerCase().indexOf(filterValue) > -1;
        options[i].style.display = shouldDisplay ? "" : "none";
      }
    }




    // Function to fetch supported currencies and populate the dropdowns
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

    // Function to fetch currency rates and perform the conversion
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

    // Call the function to populate the dropdowns when the page loads
    getSupportedCurrencies();
    
    // Add event listener to the search input field to filter currencies
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



    let isShowingAll = false; // Global variable to track the state of the button

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
    
        // Toggle the state of the button for the next click
        isShowingAll = !isShowingAll;
    }





    async function fetchAndDisplayExchangeRates() {
        const apiURL = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7b926469d6bf4ee683361fc52bb6457c';
  
        try {
          const response = await fetch(apiURL);
          const data = await response.json();
  
          // Check if the API returned the data successfully
          if (response.ok) {
            // Extract required information from the JSON response
            const date = data.date;
            const baseCurrency = data.base;
            const rates = data.rates;
  
            // Get all currencies except the base currency
            const allCurrencies = Object.keys(rates).filter(currency => currency !== baseCurrency);
            const totalCurrencies = allCurrencies.length;
  
            // Calculate the approximate number of currencies per table
            const currenciesPerTable = Math.ceil(totalCurrencies / 3);
  
            // Split currencies into three arrays for each table
            const table1Currencies = allCurrencies.slice(0, currenciesPerTable);
            const table2Currencies = allCurrencies.slice(currenciesPerTable, currenciesPerTable * 2);
            const table3Currencies = allCurrencies.slice(currenciesPerTable * 2);
  
            // Create HTML strings for each table
            let table1Html = `<table class="table"><caption>Table 1</caption><tr><th>Currency</th><th>Rate</th></tr>`;
            let table2Html = `<table class="table"><caption>Table 2</caption><tr><th>Currency</th><th>Rate</th></tr>`;
            let table3Html = `<table class="table"><caption>Table 3</caption><tr><th>Currency</th><th>Rate</th></tr>`;
  
            // Add each exchange rate to the corresponding table
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
  
            // Close the table tags
            table1Html += '</table>';
            table2Html += '</table>';
            table3Html += '</table>';
  
            // Combine all tables into one container
            const exchangeRatesDiv = document.getElementById('exchange-rates');
            exchangeRatesDiv.innerHTML = `<h1>Exchange Rates</h1>
            <p>Date: ${date}</p>
            <p>Base Currency: ${baseCurrency}</p>
            <p>Time: ${new Date().toLocaleTimeString()}</p>
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
  
      // Call the function to fetch and display the latest exchange rates
      fetchAndDisplayExchangeRates();