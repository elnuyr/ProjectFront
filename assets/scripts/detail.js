const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getDetails() {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();

    document.getElementById("showImg").src = data.image?.original;
    document.getElementById("title").textContent = data.name;
    document.getElementById("genres").textContent = "Janrlar: " + data.genres.join(", ");
    document.getElementById("rating").textContent = "IMDB: " + (data.rating?.average ?? "N/A");
    document.getElementById("language").textContent = "Dil: " + data.language;
    document.getElementById("premiered").textContent = "Premyerası: " + data.premiered;
    document.getElementById("summary").innerHTML = data.summary ?? "Məlumat yoxdur";
    document.getElementById("officialSite").href = data.officialSite ?? "#";
  } catch (error) {
    console.log("Xəta:", error);
  }
}

getDetails();


