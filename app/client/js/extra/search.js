export const zoeken = () => {
    // Selecteer de zoekbalk en de lijst met items
    const searchInput = document.querySelector('input[type="Zoeken"]');
    const itemList = document.querySelector(".inventaris");
  
    // Voeg een event listener toe voor het 'input' event van de zoekbalk
    searchInput.addEventListener("input", function (event) {
      const searchTerm = event.target.value.toLowerCase(); // Haal de zoekterm op en zet deze om naar kleine letters
  
      // Selecteer alle itemblokken
      const itemBlocks = itemList.querySelectorAll(".block--plan");
  
      // Loop door elk itemblok en toon/verberg op basis van de zoekterm
      itemBlocks.forEach(function (block) {
        const items = block.querySelectorAll(".plan-card");
  
        // Houd bij of er een overeenkomst is gevonden binnen het itemblok
        let hasMatchInBlock = false;
  
        // Loop door elk item in het itemblok
        items.forEach(function (card) {
          const label = card
            .querySelector(".card__plan__title")
            .textContent.toLowerCase(); // Haal de tekst van het itemlabel op en zet deze om naar kleine letters
  
          // Controleer of de zoekterm voorkomt in het itemlabel
          if (label.includes(searchTerm)) {
            card.style.display = "block"; // Toon het item als de zoekterm overeenkomt
            hasMatchInBlock = true; // Markeer dat er een overeenkomst is gevonden binnen het itemblok
          } else {
            card.style.display = "none"; // Verberg het item als de zoekterm niet overeenkomt
          }
        });
  
        // Toon of verberg het hele itemblok op basis van de zoekterm
        block.style.display = hasMatchInBlock ? "block" : "none";
      });
    });
  };
  