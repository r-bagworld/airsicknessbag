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
    .filter(bag => bag.new === true)
    .slice(0, 4);

  container.innerHTML = newBags.map(bag => `
    <div class="bg-white rounded-xl shadow-md p-3 max-w-[190px] w-full mx-auto hover:shadow-lg transition">

      <img
        src="${bag.images[0]}"
        alt="${bag.airline}"
        class="w-full h-56 object-contain"
        loading="lazy"
      >

      <div class="mt-2 text-left">
        <h3 class="font-semibold text-sm leading-tight">
          ${bag.airline}
        </h3>

        <p class="text-xs text-gray-500">
          ${bag.english} (${bag.IATA}/${bag.ICAO})
        </p>

        <p class="text-xs text-gray-500">
          ${bag.year}
        </p>
      </div>

    </div>
  `).join("");
}

fetchData();
