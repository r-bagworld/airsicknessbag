let bags = [];

async function fetchData() {
  const res = await fetch("bags.json");
  bags = await res.json();
  renderNewBags();
}

function renderNewBags() {
  const container = document.getElementById("newBagContainer");

  if (!container) return;

  const newBags = bags
    .filter(bag => bag.new)
    .slice(0, 4);

  container.innerHTML = newBags.map(bag => `
    <div class="bg-white rounded-xl shadow p-3">
      <img src="${bag.images[0]}"
           class="w-full"
           alt="${bag.airline}"
           loading="lazy">

      <div class="mt-3 text-left">
        <h3 class="font-semibold">${bag.airline}</h3>
        <p class="text-sm text-gray-500">
          ${bag.english} (${bag.IATA}/${bag.ICAO})
        </p>
        <p class="text-sm text-gray-500">${bag.year}</p>
      </div>
    </div>
  `).join("");
}

fetchData();
