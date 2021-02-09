const searchSongs = async() => {
    const searchText = document.getElementById('search-box').value;
    const url = (`https://api.lyrics.ovh/suggest/${searchText}`)
    try {
        const res = await fetch(url)
        const data = await res.json()
        displaySongs(data.data);
    } catch (error) {
        displayError('We Are Sorry')
    }

};
// const searchSongs = () => {
//     const searchText = document.getElementById('search-box').value;
//     const url = (`https://api.lyrics.ovh/suggest/${searchText}`)
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displaySongs(data.data))
//         .catch(error => displayError('We Are Sorry to Load Data'))
// };

const displaySongs = (songs) => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
      <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
  <source src="${song.preview}" type="audio/mpeg">
</audio>
    </div>
  <div class="col-md-3 text-md-right text-center">
      <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
  </div>
      `;
        songContainer.appendChild(songDiv);
    });
};
const getLyric = async(artist, title) => {
    const lyricUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(lyricUrl)
        const data = await res.json()
        displayLyric(data.lyrics);
    } catch (error) {
        displayError('We Are Sorry to Load Data!!!')
    }
};
// const getLyric = (artist, title) => {
//     const lyricUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(lyricUrl)
//         .then(res => res.json())
//         .then(data => displayLyric(data.lyrics))
//         .catch(error => displayError(alert('We Are Sorry !! Unable to Load Data From Server')))
// };

const displayLyric = lyrics => {
    document.getElementById('lyric').innerText = lyrics;
}
const displayError = (error) => {
    document.getElementById('error-show').innerText = error;
}