export const loadDetails = () => {
  const $requestCards = document.querySelectorAll(".request-card");

  if ($requestCards.length === 0) {
    return "No request cards found";
  }

  console.log($requestCards);
};
