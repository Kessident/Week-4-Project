const audioPlayer = document.querySelector('.music-player');
const searchTrackField = document.querySelector('.searchTrackField');
const searchTrackBtn = document.querySelector('.searchTrkBtn');
const nowPlaying = document.querySelector('.nowPlaying');
const nowPlayingUser = document.querySelector('.nowPlayingUser');
const results = document.querySelector('.results');
const loadMore = document.querySelector('.loadMoreResults');
let trackList;

SC.initialize({
  client_id: '8538a1744a7fdaa59981232897501e04'
});

//Find all tracks of inputted name, limit of 30, store in trackList
function searchTrack(searchName) {
  SC.get('/tracks', {
    limit: 30,
    q: searchName,
    license: 'cc-by-sa'
  }).then(function(tracks) {
    // console.log(tracks);
    trackList = tracks;

    styleResults(trackList, true);
  });
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


    let bandName = document.createElement("h4");
    bandName.classList.add("bandName");
    bandName.innerHTML = currentTrack.user.permalink;
    newCard.appendChild(bandName);

    newCard.addEventListener('click', function(e) {
      playTrack(i);
    });

    if (!currentTrack.streamable) {
      newCard.style.backgroundColor = "red";
      let noStream = document.createElement('p');
      noStream.innerHTML = "<i>Not Streamable</i>";
      newCard.appendChild(noStream);
    }

    results.appendChild(newCard);
  }
}

//Load and autoplay selected track, if streamable
function playTrack(trackNum) {
  track = trackList[trackNum];
  if (track.streamable) {
    const client_id = "8538a1744a7fdaa59981232897501e04";
    audioPlayer.src = track.stream_url + "?client_id=" + client_id;

    let trackLink = '<a href="' + track.permalink_url + '">' + track.title + '</a>';
    nowPlaying.innerHTML = trackLink;

    let uploaderLink = '<a href="' + track.user.permalink_url + '">' + track.user.permalink + '</a>';
    nowPlayingUser.innerHTML = uploaderLink;

    audioPlayer.setAttribute("autoplay", true);
  } else {
    window.alert("Track is not streamable, please select another");
  }
}


(function() {
  searchTrackField.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchTrack(searchTrackField.value);
      searchTrackField.value = "";
    }
  });

  searchTrackBtn.addEventListener('click', function(e) {
    searchTrack(searchTrackField.value);
    searchTrackField.value = "";
  });
})();
