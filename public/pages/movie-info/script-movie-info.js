async function windowActions(){
    const URLQuery = window.location.search;
    const URLParam = new URLSearchParams(URLQuery);
    const URL_ID = URLParam.get('id');
    async function populateMovieInfo(movie_id){
        
    }

    console.log(URL_ID)

}
window.onload = windowActions;