// Wrap everything in an async function to avoid top-level await issues
const init = async () => {
  try {
    const data = await fetch("/api");
    // Check if the response is actually okay before parsing
    if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);

    const response = await data.json();
    renderCards(response);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

function renderCards(cardsData) {
  const container = document.querySelector(".cards-container");
  if (!container) return;

  let cardsHTML = "";
  cardsData.forEach((card, i) => {
    cardsHTML += `
      <article class="sighting-card" aria-labelledby="sighting-title-${i}">
        <p class="card-details">${card.timeStamp}, ${card.location}</p>
        <h3 id="sighting-title-${i}">${card.title}</h3>
        <div class="sighting-text-wrapper">
          <p class="sighting-text">${card.text}</p>
        </div>
        <button class="read-more-btn" aria-expanded="false">Read in full</button>
      </article>
    `;
  });
  container.innerHTML = cardsHTML;
}

// Start the process
init();

// handle card expand/collapse
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("read-more-btn")) return;

  const button = e.target;
  const sightingCard = button.closest(".sighting-card");
  const isExpanded = sightingCard.classList.toggle("expanded");

  button.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  button.textContent = isExpanded ? "Show less" : "Read in full";
});
