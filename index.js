// Function to fetch data and parse the response based on format
async function fetchData(apiKey, format = "json") {
    const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&format=${format}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      if (format === "json") {
        const data = await response.json();
        return data;
      } else if (format === "xml") {
        const textData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, "text/xml");
        return xmlDoc;
      } else {
        throw new Error("Invalid response format. Supported formats: json, xml");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  // Replace YOUR_APIKEY with your actual API key
  const apiKey = "YOUR_APIKEY";
  
  // Fetch data in JSON format
  fetchData(apiKey, "json")
    .then(data => {
      console.log("JSON Response:");
      console.log(data);
    })
    .catch(error => {
      console.error("Error fetching JSON data:", error);
    });
  
  // Fetch data in XML format
  fetchData(apiKey, "xml")
    .then(data => {
      console.log("XML Response:");
      console.log(data);
    })
    .catch(error => {
      console.error("Error fetching XML data:", error);
    });
  