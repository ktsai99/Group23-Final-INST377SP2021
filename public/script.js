async function windowActions()
{
    async function genres(){
        const endpoint ="/api/genres"
        const request = await fetch(endpoint);
        const genre = await request.json()
        console.log(genre.data)
        const list = document.querySelector('#genre')
        
        let html ="";
        genre.data.forEach((row) => {
            console.log(row)
            html+= `
            <li id ="${row.genre_id}"><a>${row.genre_name}</a></li>
            `
        });
        list.innerHTML = html;
    }
    async function genresFill(genre_id){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullArray = [];
        
        full.forEach((row) => {
            if (row)
            fullArray.push({
                title: row.title,
                rating: row.avg_star_rating

            });
        });
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
                rating: row.avg_star_rating

            });
        });
        const list = document.querySelector("#rating");
        let html ="";
        fullArray.sort(function(a,b){
            return b.rating - a.rating;
        })
       
      
        fullArray.slice(0,20).forEach((a,b) => {
         
            html +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
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
                year: row.year

            });
        });
        const list = document.querySelector("#year");
        let html ="";
        fullArray.sort(function(a,b){
            return b.year - a.year;
        })
       
        
        fullArray.slice(0,20).forEach((a,b) => {
           
            html +=`
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
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
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
            `
            
        });
        list.innerHTML = html;
        
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
                year: row.year
            
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
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>

            `
            
        });
        list.innerHTML = html;
        
        }
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
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
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
                year: row.year
            
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
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>

            `
            
        });
        list.innerHTML = html;
        
        }
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

genres();
getTVReleaseList();
getTVRatingsList();
getFullRatingsList();
getFullReleaseList(); 
getMOVRatingsList();
getMOVReleaseList();    
}
window.onload = windowActions;