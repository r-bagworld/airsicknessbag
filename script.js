let bags = [];
let currentPage = 1;
const itemsPerPage = 32;

const params = new URLSearchParams(window.location.search);
const region = params.get("region"); //Japan / China / East Asia / South East Asia /null

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

  const filtered = bags.filter((bag) => {
    const matchSearch =
      bag.airline.toLowerCase().includes(searchTerm) ||
      bag.country.toLowerCase().includes(searchTerm) ||
      bag.year.toLowerCase().includes(searchTerm);

    const matchRegion =
      !region || bag.country === region;

    return matchSearch && matchRegion;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  container.innerHTML = pageItems
    .map(
      (bag) => `
    <div class="card bg-gray-200 rounded-xl shadow-sm overflow-hidden p-3">
    
      <div class="flip-card md:hidden">
        <div class="flip-inner">
          <div class="flip-front">
            <img src="${bag.images[0]}" alt="${bag.airline}" loading="lazy" decoding="async"/>
          </div>
          <div class="flip-back">
            <img src="${bag.images[1] || bag.images[0]}" alt="${bag.airline}" loading="lazy" decoding="async"/>
          </div>
        </div>
      </div>
        
      <div class="hidden md:flex gap-2">
        <img src="${bag.images[0]}" class="w-1/2" alt="${bag.airline}" loading="lazy" decoding="async"/>
        <img src="${bag.images[1] || bag.images[0]}" class="w-1/2" alt="${bag.airline}" loading="lazy" decoding="async"/>
      </div>
        
      <div class="mt-3 text-left">
        <h2 class="text-lg font-semibold">${bag.airline}</h2>
        <p class="text-sm text-gray-500">${bag.year}</p>
        <p class="text-sm text-gray-500">${bag.country}</p>
        <p class="text-sm mt-2">${bag.description}</p>
      </div>
      
    </div>
    `
    )
    .join("");

  // 🔄 カードのクリックで反転
  document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  // 📄 ページネーション
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

// 🔍 検索バー入力時に再描画
document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  renderBags();
});

// 🚀 初期データ読み込み
fetchData();

