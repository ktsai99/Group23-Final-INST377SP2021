"use strict";

async function windowActions()
{
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
          
            if (row.media_type === "M" && row.genre_name === genre_name){
                MOVArray.push({
                    title: row.title,
                    rating: row.avg_star_rating,
                    movie_id: row.catalogue_id,
                    poster: row.poster_link
                });
            };
        });
       
        const MOVlist = document.querySelector("#MOVgenre-content");
        let MOVhtml ="";
    
        MOVArray.forEach((a,b) => {
            
            
            
            MOVhtml +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${MOVArray[b].title}
            <ul>
            <img src="${MOVArray[b].poster}" alt="Movie Poster id ${MOVArray[b].movie_id}"/>
            </ul>
            </li>
            `
            
        });

    
        MOVlist.innerHTML = MOVhtml;
    
     
        
        }
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
        <li id = "title"><a href = "./movie-info/movie-info.html?&id=${fullArray[b].movie_id}">${fullArray[b].title}
            <ul>
            <img src="${fullArray[b].poster}" alt="Movie Poster id ${fullArray[b].catalogue_id}"/>
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
            <li id = "title"><a href = "./movie-info/movie-info.html?&id=${fullArray[b].movie_id}">${fullArray[b].title}
            <ul>
            <img src="${fullArray[b].poster}" alt="Movie Poster id ${fullArray[b].catalogue_id}"/>
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
    getMOVRatingsList();
    getMOVReleaseList();

}
window.onload = windowActions;