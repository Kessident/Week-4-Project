const audioPlayer = document.querySelector('.music-player');
const client_id = "095fe1dcd09eb3d0e1d3d89c76f5618f";
const searchButton = document.querySelector('.searchButton');
const searchField = document.querySelector('.searchField');
const nowPlaying = document.querySelector('.nowPlaying');
const nowPlayingUser = document.querySelector('.nowPlayingUser');
const results = document.querySelector('.results');
const loadMore = document.querySelector('.loadMoreResults');
let trackList;
let searchTerm;
let artistSearched;

SC.initialize({
  client_id: '095fe1dcd09eb3d0e1d3d89c76f5618f'
});

//Find all tracks of inputted name, limit of 15, store in trackList
function searchArtist(artistName) {
  SC.get('/tracks', {
    limit: 15,
    q: artistName,
    license: 'cc-by-sa'
  }).then(function(tracks) {
    console.log(tracks);
    trackList = tracks;
    searchTerm = artistName;
    styleResults(trackList);

  });
}

//Load and sutoplay selected track, if streamable
function playTrack(trackNum) {
  track = trackList[trackNum];
  if (track.streamable) {
    audioPlayer.src = track.stream_url + "?client_id=" + client_id;
    nowPlaying.innerHTML = track.title;
    nowPlayingUser.innerHTML = track.user.permalink;
    audioPlayer.setAttribute("autoplay", true);
  } else {
    window.alert("Track is not streamable, please select another");
  }
}

//Creates and places the track cards
function styleResults(trackList) {
  results.innerHTML = '<p>Search Results: </p>';
  for (let i = 0; i < trackList.length; i++) {
    let currentTrack = trackList[i];
    let newCard = document.createElement("div");
    newCard.classList.add("resultsCard");

    let newImg = document.createElement("img");
    newImg.classList.add("thumbnail");
    if (currentTrack.artwork_url) {
      newImg.src = currentTrack.artwork_url;
    } else {
      newImg.src = "SC_Placeholder.png";
    }
    newCard.appendChild(newImg);

    let newTitle = document.createElement("p");
    newTitle.classList.add("songTitle");
    newTitle.innerHTML = currentTrack.permalink;
    newCard.appendChild(newTitle);


    let newName = document.createElement("p");
    newName.classList.add("bandName");
    newName.innerHTML = currentTrack.user.permalink;
    newCard.appendChild(newName);

    newCard.addEventListener('click', function(e) {
      playTrack(i);
    });
    results.appendChild(newCard);
  }
}


searchField.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    pageNum = 1;
    artistSearched = searchField.value;
    searchArtist(artistSearched, pageNum);
    searchField.value = "";
  }
});

searchButton.addEventListener('click', function(e) {
  pageNum = 1;
  artistSearched = searchField.value;
  searchArtist(artistSearched, pageNum);
  searchField.value = "";
});




// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play
