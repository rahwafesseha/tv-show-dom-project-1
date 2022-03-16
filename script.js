//You can edit ALL of the code here

let allEpisodes;
const filterEpisodesById = (id)=>{
return allEpisodes.filter((episode)=>
episode.id.toString() === id
)};

const searchFilteredEpisodes = (input) => { 
  return allEpisodes.filter(
  (epi) =>
    epi.name.toLowerCase().includes(input.toLowerCase()) ||
    epi.summary.toLowerCase().includes(input.toLowerCase())
);
}
function getAllEpisodesLive(showId){
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((Response) => Response.json())
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    
      selectedEpisodesOption();
    });
 
}

// const allEpisodes = getAllEpisodes();

function setup() {
  getAllEpisodesLive(82);
const input = document.getElementById("searchInput");
input.addEventListener("keyup", () => {
   
  makePageForEpisodes(searchFilteredEpisodes(input.value));

});
 let allShows = getAllShows();
 selectShows(allShows);

  
}

function formatNumber(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

function selectedEpisodesOption(){
 const selectEpisode = document.getElementById("selectEpisode");

 allEpisodes.forEach((episode,index) =>{
    const selectOptions = document.createElement("option");
    selectOptions.value = episode.id;
    selectOptions.innerHTML = `S${formatNumber(episode.season)}E${formatNumber(episode.number)} - ${episode.name} `;
    selectEpisode.add(selectOptions);
 })
selectEpisode.addEventListener("change",(e)=>{
let selectedEpisodes = filterEpisodesById(e.target.value)
makePageForEpisodes(selectedEpisodes);
})
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
    title.innerHTML = `${episode.name} - S${formatNumber(episode.season
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

//selecting shows
function selectShows(allShows){
  let select = document.getElementById("select-shows");
  allShows.forEach((show)=>{
    let option = document.createElement("option");
    option.value = show.id;
    option.innerText = show.name;
    select.appendChild(option);
  })
  
   
   
    
}