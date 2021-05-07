"use strict";

async function windowActions()
{
    async function getPosterLink(movie_id){

        const endpoint =`/api/movies/${movie_id}`;
        const request = await fetch(endpoint);
        const movie = await request.json();
        
        
        const posterID = movie[0]["poster_id"];
        const endpoint2 = `/api/poster/image/${posterID}`
        const request2 = await fetch(endpoint2);
        const poster = await request2.json();
        const posterIMG = poster[0].poster_link;
        return posterIMG;
    }

    async function genresTab(){
        const endpoint ="/api/genres";
        const request = await fetch(endpoint);
        const genre = await request.json();
        //console.log(genre.data)
        const list = document.querySelector('#genre')
        
        let html ="";
        genre.data.forEach((row) => {
            //console.log(row)
            html+= `
            <li id ='${row.genre_id}'><a>${row.genre_name}</a></li>
            `
        });
        list.innerHTML = html;
    }
    async function genresFill(genre_id){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullArray = [];
        const TVArray = [];
        const MOVArray = [];
        const request2 = await fetch(`/api/genre/${genre_id}`)
        const data = await request2.json();
        
        const genre_name = data[0].genre_name;
        
        full.forEach((row) => {
            if (row.media_type === "T" && row.genre_name === genre_name){
            TVArray.push({
                title: row.title,
                rating: row.avg_star_rating,
                movie_id: row.catalogue_id,
                poster: row.poster_link
            });
            };
            if (row.genre_name === genre_name){
            fullArray.push({
                title: row.title,
                rating: row.avg_star_rating,
                movie_id: row.catalogue_id,
                poster: row.poster_link
            });
        };
            if (row.media_type === "M" && row.genre_name === genre_name){
                MOVArray.push({
                    title: row.title,
                    rating: row.avg_star_rating,
                    movie_id: row.catalogue_id,
                    poster: row.poster_link
                });
            };
        });
        console.log
        const list = document.querySelector("#genre-content");
        let html ="";
        const MOVlist = document.querySelector("#MOVgenre-content");
        let MOVhtml ="";
        const TVlist = document.querySelector("#TVgenre-content");
        let TVhtml ="";
     
        let posterLink;
        
      
        fullArray.forEach((a,b) => {
            
            
            
            html +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html&id=${fullArray[b].movie_id}">${fullArray[b].title}
            <ul>
            <img src="${fullArray[b].poster}" alt="Movie Poster id ${fullArray[b].movie_id}"/>
            </ul>
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
            `
            
        });
        TVArray.forEach((a,b) => {
            
            
            
            TVhtml +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${TVArray[b].title}
            <ul>
            <img src="${TVArray[b].poster}" alt="Movie Poster id ${TVArray[b].movie_id}"/>
            </ul>
            <ul>
            <li id = "star-rating" >${TVArray[b].rating}</li>
            </ul>
            </li>
            `
            
        });
        MOVArray.forEach((a,b) => {
            
            
            
            MOVhtml +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${MOVArray[b].title}
            <ul>
            </ul>
            <ul>
            <li id = "star-rating" >${MOVArray[b].rating}</li>
            </ul>
            </li>
            `
            
        });
        if (list !== null){
        list.innerHTML = html;
        };
        if (MOVlist !== null){
        MOVlist.innerHTML = MOVhtml;
        };        
        if (TVlist !== null){
        TVlist.innerHTML = TVhtml;
        };
        
        }
        
    

    
    async function getFullRatingsList(){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
      
        const fullArray = [];
        full.forEach((row) => {
            fullArray.push({
                title: row.title,
                rating: row.avg_star_rating,
                poster: row.poster_link,
                movie_id: row.catalogue_id
            });
        });
        const list = document.querySelector("#rating");
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
   
    async function getFullReleaseList(){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullArray = [];
        full.forEach((row) => {
            
            fullArray.push({
                title: row.title,
                rating: row.avg_star_rating,
                year: row.year,
                poster: row.poster_link,
                movie_id: row.catalogue_id
            });
        });
        const list = document.querySelector("#year");
        let html ="";
        fullArray.sort(function(a,b){
            return b.year - a.year;
        })
       
        
        fullArray.slice(0,20).forEach((a,b) => {
           
            html +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html?&id=${fullArray[b].movie_id}">${fullArray[b].title}
            <ul>
            <img src="${fullArray[b].poster}" alt="Movie Poster id ${fullArray[b].movie_id}"/>
            </ul>
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>

            `
            
        });
        list.innerHTML = html;
        
        }


//Carousel code
    let width = 136;
    let count = 1;
    
    let list = document.querySelector(".first");
    let list2 = document.querySelector(".second");
    let listElms = document.querySelectorAll("li#title");

    let position = 0; // scroll position

        document.querySelector('.prev').onclick = function() {
        // shift left
        position += width * count;
        // can't move to the left too much, end of images
        position = Math.min(position, 0)
        list.style.marginLeft = position + 'px';
        };
        
        document.querySelector('.next').onclick = function() {
            // shift right
            position -= width * count;
            // can only shift the ribbbon for (total ribbon length - visible count) images
            position = Math.max(position, -width * (9 + count));
            list.style.marginLeft = position + 'px';
          };
          document.querySelector('.prev2').onclick = function() {
            // shift left
            position += width * count;
            // can't move to the left too much, end of images
            position = Math.min(position, 0)
            list2.style.marginLeft = position + 'px';
            };
            
            document.querySelector('.next2').onclick = function() {
                // shift right
                position -= width * count;
                // can only shift the ribbbon for (total ribbon length - visible count) images
                position = Math.max(position, -width * (9 + count));
                list2.style.marginLeft = position + 'px';
              };


genresTab();
getFullRatingsList();
getFullReleaseList();  
  
let parent_id = 1;

document.getElementById("genre").addEventListener("click", (event) =>{
    const target = event.target;
    const parent = target.parentElement;
    if(parent_id !== parent.id){

        document.getElementById(`${parent_id}`).classList.remove("is-active");
    };
    
    
    
    document.getElementById(`${parent.id}`).classList.add("is-active");
    
    genresFill(parent.id);
    parent_id = parent.id;
});

}
window.onload = windowActions;
