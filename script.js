let bags = [];
let currentPage = 1;
const itemsPerPage = 50;

async function fetchData() {
  const res = await fetch("bags.json");
  bags = await res.json();
  renderBags();
}

function renderBags() {
  const container = document.getElementById("bagContainer");
  const pagination = document.getElementById("pagination");
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  const filtered = bags.filter(
    (bag) =>
      bag.airline.toLowerCase().includes(searchTerm) ||
      bag.country.toLowerCase().includes(searchTerm) ||
      bag.year.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  container.innerHTML = pageItems
  .map(
    (bag) => `
    <div class="card bg-white rounded-xl shadow-sm overflow-hidden p-3">
      <div class="flip-card">
        <div class="flip-inner">
          <div class="flip-front">
            <img src="${bag.images[0]}" alt="${bag.airline}" />
          </div>
          <div class="flip-back">
            <img src="${bag.images[1] || bag.images[0]}" alt="${bag.airline}" />
          </div>
        </div>
      </div>
      <div class="mt-3 text-left">
        <h2 class="text-lg font-semibold">${bag.airline}</h2>
        <p class="text-sm text-gray-500">${bag.country} / ${bag.year}</p>
        <p class="text-sm mt-2">${bag.description}</p>
      </div>
    </div>
  `
  )
  .join("");

// クリックで反転
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  renderBags();
});

fetchData();
