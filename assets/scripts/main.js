const filmType = document.getElementById("filmType");
const searchInput = document.getElementById("search");
const mainSection = document.querySelector(".mainSection");
const searchSection = document.querySelector(".searchSection");

let allFilms = [];
let filterTypeFilms = [];

fetch("https://api.tvmaze.com/shows")
  .then((res) => res.json())
  .then((data) => {
    allFilms = data;
    renderByType(data);
  })
  .catch((err) => {
    console.error(err);
    filmType.innerHTML = `<p class="notFound">Error loading films</p>`;
  });

function renderByType(data) {
  filterTypeFilms = [];
  filmType.innerHTML = "";

  data.forEach((film) => {
    if (film.type && !filterTypeFilms.includes(film.type)) {
      filterTypeFilms.push(film.type);
    }
  });

  filterTypeFilms.forEach((type) => {
    const cards = document.createElement("div");

    cards.innerHTML = `
      <h4 class="filmText">${type}</h4>
      <div class="imgTitle"></div>
    `;

    filmType.appendChild(cards);

    const titleImg = cards.querySelector(".imgTitle");
    const typeOfFilm = data.filter((item) => item.type === type);

    let start = 0;
    const STEP = 7;

    addSlice();

    let addBtn = null;
    if (typeOfFilm.length > STEP) {
      addBtn = document.createElement("button");
      addBtn.textContent = "+7 Film Added";
      addBtn.style.margin = "10px 20px";
      addBtn.style.cursor = "pointer";
      cards.appendChild(addBtn);

      addBtn.addEventListener("click", () => {
        addSlice();
        if (start >= typeOfFilm.length && addBtn) {
          addBtn.remove();
        }
      });
    }

    function addSlice() {
      const slice = typeOfFilm.slice(start, start + STEP);
      slice.forEach((film) => {
        if (!film.image || !film.image.medium) return;

        titleImg.innerHTML += `
          <a href="detail.html?id=${film.id}">
            <img src="${film.image.medium}" alt="${film.name}">
          </a>
        `;
      });
      start += STEP;
    }
  });
}

let searchTimeout;

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();

  if (searchTimeout) clearTimeout(searchTimeout);

  if (!query) {
    searchSection.innerHTML = "";
    mainSection.style.display = "block";
    return;
  }

  searchTimeout = setTimeout(() => {
    mainSection.style.display = "none";
    searchSection.innerHTML = "";

    $.ajax({
      url: `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
      method: "GET",
      success: function (results) {
        if (!results.length) {
          searchSection.innerHTML = `<div class="notFound">Not Found Films</div>`;
          return;
        }

        const html = results
          .map((item) => {
            const film = item.show;
            if (!film.image || !film.image.medium) return "";

            return `
              <div class="card">
                <a href="detail.html?id=${film.id}">
                  <img src="${film.image.medium}" alt="${film.name}">
                </a>
                <div>
                  <h2 class="searchName">${film.name}</h2>
                </div>
              </div>
            `;
          })
          .join("");

        searchSection.innerHTML =
          html || `<div class="notFound">Not Found Films</div>`;
      },
      error: function () {
        searchSection.innerHTML = `<div class="notFound">Error loading search results</div>`;
      },
    });
  }, 400);
});
