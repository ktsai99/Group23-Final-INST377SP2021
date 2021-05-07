async function windowActions(){
    const URLQuery = window.location.search;
    const URLParam = new URLSearchParams(URLQuery);
    const URL_ID = URLParam.get('id');
    
    async function populateMovieInfo(movie_id)
    {
        const posterEndpoint =`/api/poster/image/${movie_id}`;
        const movieEndpoint = `/api/movies/${movie_id}`;
        const request = await fetch(posterEndpoint);
        const request2 = await fetch(movieEndpoint);
        const poster = await request.json();
        const info = await request2.json();
        console.log(info);
        
        document.querySelector("#movie-poster").href = poster[0].poster_link;
        document.querySelector("#movie-poster-img").src = poster[0].poster_link;

        const table = document.getElementById("info-table");
        console.log(table);
        document.getElementById('Trailer').innerHTML = info[0].trailer_link;
        document.getElementById('Title').innerHTML = info[0].title;
        document.getElementById('ViewerRating').innerHTML = info[0].rating_description;
        document.getElementById('Rating').innerHTML = info[0].avg_star_rating;
        document.getElementById('Genre').innerHTML = info[0].genre_name;
        document.getElementById('Year').innerHTML = info[0].year;
        document.getElementById('Description').innerHTML = info[0].description;

        if(info[0].media_type == "T"){
            document.getElementById('Seasons').innerHTML = info[0].seasons;
            document.getElementById('Episodes').innerHTML = info[0].episodes;
        } else {
            document.getElementById("Seasons").parentNode.remove();
            document.getElementById("Episodes").parentNode.remove();
        }
    }

    //Movie confirm overlay
    const button = document.getElementById('48hr');

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
  if (event.target == modal) {
    button.style.display = "none";
  }
}

    console.log(URL_ID)
    populateMovieInfo(URL_ID);
}
window.onload = windowActions;