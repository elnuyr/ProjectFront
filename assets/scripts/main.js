const filmType = document.getElementById("filmType");
const searchInput = document.querySelector(".right-side input");
const searchResult = document.getElementById("searchResult");
searchInput.addEventListener("keyup", async (e) => {
  const query = e.target.value.trim();

  if (query.length < 2) {
    searchResult.style.display = "none";
    return;
  }

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await response.json();

  searchResult.innerHTML = "";
  searchResult.style.display = "flex";

  data.slice(0, 10).forEach(item => {
    const show = item.show;

    const div = document.createElement("div");
    div.classList.add("searchItem");
    div.innerHTML = `
        <img src="${show.image?.medium ?? 'https://via.placeholder.com/60'}">
        <span>${show.name}</span>
    `;

    div.addEventListener("click", () => {
      window.location.href = `detail.html?id=${show.id}`;
    });

    searchResult.appendChild(div);
  });
});

async function getShows() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();

    renderShows(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

function renderShows(shows) {
  filmType.innerHTML = "";

  shows.slice(0, 30).forEach(show => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${show.image?.medium}" alt="${show.name}">
      <h3>${show.name}</h3>
      <p>IMDB: ${show.rating?.average ?? "N/A"}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `detail.html?id=${show.id}`;
    });


    filmType.appendChild(card);
    
  });
}

getShows();





// fetch("https://api.tvmaze.com/shows?&select=key1,key2,key3").then(response => response.json()).then(data => {
//     console.log(data);
// });

