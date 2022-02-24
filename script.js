//You can edit ALL of the code here
//edit 
function setup() {
  const allEpisodes = getAllEpisodes();
const input = document.getElementById("searchInput");
input.addEventListener("keyup", () => {
  const filteredEpisodes = allEpisodes.filter(
    (epi) =>
      epi.name.toLowerCase().includes(input.value.toLowerCase()) ||
      epi.summary.toLowerCase().includes(input.value.toLowerCase())
  );

  makePageForEpisodes(filteredEpisodes);
});

  
  makePageForEpisodes(allEpisodes);
}

function formatNumber(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}
 
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const footer = document.createElement("footer");
  const source = document.createElement("p");
  rootElem.innerHTML = "";
 
  episodeList.forEach((episode) => {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("mainDiv");
    let title = document.createElement("h3");
    title.id = "title";
    title.classList.add("titleEpisode");
    title.innerHTML = `${episode.name} - S${formatNumber(
      episode.season
    )}E${formatNumber(episode.number)}`;
    let episodeImage = document.createElement("img");
    episodeImage.classList.add("imageEpisode");
    episodeImage.src = episode.image.medium;

    episodeContainer.appendChild(title);

    episodeContainer.appendChild(episodeImage);
    episodeContainer.innerHTML += episode.summary;
    rootElem.appendChild(episodeContainer);
  
    
  });
  
}


window.onload = setup;
