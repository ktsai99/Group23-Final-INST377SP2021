"use strict";

async function windowActions()
{
    async function getTVRatingsList(){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
       
        const fullArray = [];
        full.forEach((row) => {
            
            if (row.media_type === "T"){
                fullArray.push({
                    title: row.title,
                    rating: row.avg_star_rating,
                    movie_id: row.catalogue_id,
                    poster: row.poster_link
                
                });
            }
        });
       
        const list = document.querySelector("#TVrating");
        let html ="";
        fullArray.sort(function(a,b){
            return b.rating - a.rating;
        })
      
        
        fullArray.forEach((a,b) => {
           
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
    async function getTVReleaseList(){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullArray = [];
        full.forEach((row) => {
            if (row.media_type ==="T"){
            fullArray.push({
                
                title: row.title,
                rating: row.avg_star_rating,
                year: row.year,
                movie_id: row.catalogue_id,
                poster: row.poster_link
            
            });
            }
        });
        const list = document.querySelector("#TVyear");
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

    getTVRatingsList();
    getTVReleaseList();
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

    async function genresTab(){
        const endpoint ="/api/genres";
        const request = await fetch(endpoint);
        const genre = await request.json();
        //console.log(genre.data)
        const list = document.querySelector('#genre')
        const movEndpoint = "/api/movies"
        const request = await fetch(endpoint);
        const movie = await request.json();
        const genreCountArray = [];
        movie.forEach
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
 
            
        });
       
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
       
        
        TVlist.innerHTML = TVhtml;
        };
        
        
        genresTab();


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