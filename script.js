//Filtering episodes
let allShows = getAllShows();
let allEpisodes;
const filterEpisodesById = (id) => {
  return allEpisodes.filter((episode) => episode.id.toString() === id);
};
//searching episodes
const searchFilteredEpisodes = (input) => {
  return allEpisodes.filter(
    (epi) =>
      epi.name.toLowerCase().includes(input.toLowerCase()) ||
      epi.summary.toLowerCase().includes(input.toLowerCase())
  );
};
//searching shows
const searchFilteredShows = (input) => {
  return allShows.filter(
    (epi) =>
      epi.name.toLowerCase().includes(input.toLowerCase()) ||
      epi.summary.toLowerCase().includes(input.toLowerCase())
  );
};

function getAllEpisodesLive(showId) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((Response) => Response.json())
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);

      selectedEpisodesOption();
    });
}

function setup() {
  const input = document.getElementById("searchInput");
  let select = document.getElementById("select-shows");
  input.addEventListener("keyup", () => {
   
    if(select.value==="all")
    makePageForShows(searchFilteredShows(input.value));
    else
    makePageForEpisodes(searchFilteredEpisodes(input.value));
  });

  selectShows(allShows);

  getAllEpisodesLive(82);
}
//formatting the season number
function formatNumber(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}
//selecting episodes
function selectedEpisodesOption() {
  const selectEpisode = document.getElementById("selectEpisode");
  selectEpisode.innerHTML = "";
  const selectOptions = document.createElement("option");
  selectOptions.value = "all";
  selectOptions.innerHTML = `Show All Episodes`;
  selectEpisode.add(selectOptions);

  allEpisodes.forEach((episode, index) => {
    const selectOptions = document.createElement("option");
    selectOptions.value = episode.id;
    selectOptions.innerHTML = `S${formatNumber(episode.season)}E${formatNumber(
      episode.number
    )} - ${episode.name} `;
    selectEpisode.add(selectOptions);
  });
  selectEpisode.addEventListener("change", (e) => {
    let selectedEpisodes = filterEpisodesById(e.target.value);
    if (e.target.value === "all") makePageForEpisodes(allEpisodes);
    else makePageForEpisodes(selectedEpisodes);
  });
}

function displayNumber(allEpisodes, filteredEpisodes) {
  let currentEpisodes = document.getElementById("displayEpisodeNumber");
  currentEpisodes.innerHTML = `Displaying ${filteredEpisodes}/${allEpisodes}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
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

    displayNumber(allEpisodes.length, episodeList.length);

    episodeContainer.appendChild(title);

    episodeContainer.appendChild(episodeImage);
    episodeContainer.innerHTML += episode.summary;
    rootElem.appendChild(episodeContainer);
  });
}
window.onload = setup;

//Make page for shows
function makePageForShows(data) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  data.forEach((show) => {
    let showContainer = document.createElement("div");
    showContainer.classList.add("mainDiv");
    let title = document.createElement("h3");
    title.id = "title";
    title.classList.add("titleEpisode");
    title.innerHTML = show.name;
    let showImage = document.createElement("img");
    showImage.classList.add("imageEpisode");
    
    try {
      showImage.src = show.image.medium;
    } catch {
     showImage.src = "https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png";
    }
    showContainer.appendChild(title);
    showContainer.appendChild(showImage);
    showContainer.innerHTML += show.summary;
    rootElem.appendChild(showContainer);
    
  });
  displayNumber(allShows.length, data.length);
}
//selecting shows
function selectShows(allShows) {
  let select = document.getElementById("select-shows");
  let option = document.createElement("option");
  option.value = "all";
  option.innerText = "Show All Shows";
  select.appendChild(option);

  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.value = show.id;
    option.innerText = show.name;
    select.appendChild(option);
  });
  select.value = "82";
  select.addEventListener("change", (e) => {
    const showId = e.target.value;
    if (showId === "all") 
    makePageForShows(allShows);
    else {
      fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
        .then((Response) => Response.json())
        .then((data) => {
          allEpisodes = data;
          selectedEpisodesOption();

          makePageForEpisodes(allEpisodes);
        });
    }
  });
}
