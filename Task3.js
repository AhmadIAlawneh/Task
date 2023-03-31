const printValues = ()=>{
  
    const roomName = document
    .getElementById("unit-selection-content")
    .querySelector("div")
    .innerHTML.trim();
  const priceSection = document.querySelector("div[data-price]");
  
  const price = priceSection.getAttribute("data-price");
  const currency = priceSection.getAttribute("data-currency-code");
  
  console.log(`Room: ${roomName}, Price: ${price}, Currency: ${currency}`);
  }