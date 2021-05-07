async function windowActions(){
    const URLQuery = window.location.search;
    const URLParam = new URLSearchParams(URLQuery);
    const URL_ID = URLParam.get('id');
    
    async function populateMovieInfo(movie_id)
    {
        const endpoint =`/api/poster/image/${movie_id}`;
        const request = await fetch(endpoint);
        const poster = await request.json();
        
        document.querySelector("#movie-poster").href = poster[0].poster_link;
        document.querySelector("#movie-poster-img").src = poster[0].poster_link;
    }

    console.log(URL_ID)

    populateMovieInfo(URL_ID);
}
window.onload = windowActions;