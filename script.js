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
        <div class="flex space-x-2 justify-center">
          ${bag.images.map(img =>
            <img src="${img}" alt="${bag.airline}" class="w-32 max-h-80 mx-auto object-contain bg-gray-100 rounded" />
          ').join('')}
        </div>
        <div class="mt-3 text-center">
          <h2 class="text-lg font-semibold">${bag.airline}</h2>
          <p class="text-sm text-gray-500">${bag.country} / ${bag.year}</p>
          <p class="text-sm mt-2">${bag.description}</p>
        </div>
      </div>
    `
  )
  .join("");

  // ページネーション
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded-md ${
      i === currentPage
        ? "bg-blue-500 text-white"
        : "bg-white border text-gray-700"
    }`;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderBags();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    pagination.appendChild(btn);
  }
}

document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  renderBags();
});

fetchData();
