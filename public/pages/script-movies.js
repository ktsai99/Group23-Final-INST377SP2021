"use strict";

async function windowActions()
{
async function getMOVReleaseList(){
    const endpoint = "/api/movies";
    const request = await fetch(endpoint);
    const full = await request.json();
    const fullArray = [];
    full.forEach((row) => {
        if (row.media_type ==="M"){
        fullArray.push({
            
            title: row.title,
            rating: row.avg_star_rating,
            year: row.year,
            movie_id: row.catalogue_id,
            poster: row.poster_link
        
        });
        }
    });
    const list = document.querySelector("#MOVyear");
    let html ="";
    fullArray.sort(function(a,b){
        return b.year - a.year;
    })
    
    
    fullArray.slice(0,20).forEach((a,b) => {

        html +=`      
        <li id = "title"><a href = "./pages/movie-info/movie-info.html?&id=${fullArray[b].movie_id}">${fullArray[b].title}
            <ul>
            <img src="${fullArray[b].poster}" alt="Movie Poster id ${fullArray[b].catalogue_id}"/>
            </ul>
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
        `
        
    });
    list.innerHTML = html;
    
    }

    async function getMOVRatingsList(){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
      
        const fullArray = [];
        full.forEach((row) => {
            
            if (row.media_type === "M"){
                fullArray.push({
                    title: row.title,
                    rating: row.avg_star_rating,
                    movie_id: row.catalogue_id,
                    poster: row.poster_link
                
                });
            }
        });

        const list = document.querySelector("#MOVrating");
        let html ="";
        fullArray.sort(function(a,b){
            return b.rating - a.rating;
        })
      
        
        fullArray.slice(0,20).forEach((a,b) => {
          
            html +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html?&id=${fullArray[b].movie_id}">${fullArray[b].title}
            <ul>
            <img src="${fullArray[b].poster}" alt="Movie Poster id ${fullArray[b].catalogue_id}"/>
            </ul>
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
            `
            
        });
        list.innerHTML = html;
        
        }

    getMOVRatingsList();
    getMOVReleaseList();
}
window.onload = windowActions;