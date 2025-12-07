const detailWrapper = document.getElementById("detail");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  detailWrapper.innerHTML = `<p class="notFound">Movie not found.</p>`;
} else {
  axios
    .get(`https://api.tvmaze.com/shows/${id}`)
    .then((res) => {
      const data = res.data;

      const img = data.image?.medium || data.image?.original || "";
      const country = data.network?.country?.name || "Unknown";
      const genres = data.genres?.length ? data.genres.join(", ") : "No info";
      const rating = data.rating?.average ?? "Unrated";
      const runtime = data.runtime ? `${data.runtime} min` : "No info";
      const premiered = data.premiered || "No info";

      const summaryText = data.summary
        ? data.summary.replace(/<[^>]*>/g, "")
        : "No summary available.";

      detailWrapper.innerHTML = `
        <div class="detailImg">
          ${
            img
              ? `<img src="${img}" alt="${data.name}">`
              : `<div style="width:100%;height:100%;background:#333;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;">No image</div>`
          }
        </div>
        <div class="detailText">
          <h2>${data.name}</h2>
          <p><span class="detailTitle">Type:</span> ${data.type}</p>
          <p><span class="detailTitle">Language:</span> ${data.language}</p>
          <p><span class="detailTitle">Genres:</span> ${genres}</p>
          <p><span class="detailTitle">Status:</span> ${data.status}</p>
          <p><span class="detailTitle">Runtime:</span> ${runtime}</p>
          <p><span class="detailTitle">Premiered:</span> ${premiered}</p>
          <p><span class="detailTitle">Rating:</span> ${rating}</p>
          <p><span class="detailTitle">Country:</span> ${country}</p>
          <div class="summary">
            <p><span class="detailTitle">Summary:</span> ${summaryText}</p>
          </div>
          ${
            data.officialSite
              ? `<p style="margin-top:16px;">
                  <a href="${data.officialSite}" target="_blank" style="color:#dc810a;text-decoration:underline;">
                    Official site
                  </a>
                </p>`
              : ""
          }
        </div>
      `;
    })
    .catch((err) => {
      console.error(err);
      detailWrapper.innerHTML = `<p class="notFound">Failed to load movie details.</p>`;
    });
}
