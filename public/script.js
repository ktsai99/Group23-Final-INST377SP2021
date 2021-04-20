async function windowActions()
{
   
    let width = 130;
    let count = 10;

    let list = document.querySelector("ul#rating");
    console.log(list)
    let listElems = document.querySelectorAll("li#title");
    console.log(listElems)
    let position = 0; // scroll position

    document.querySelector('.prev').onclick = function() {
        // shift left
        position += width * count;
        // can't move to the left too much, end of images
        position = Math.min(position, 0)
        list.style.marginLeft = position + 'px';
        };
        
    document.querySelector('.next').onclick = function() 
    {
        position -= width * count;
        position = Math.max(position, -width * (listElems.length - count));
        // transform
        list.style = "Transform: translateX(" + position + "px)";
    };


    async function getFullRatingsList(){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
        console.log(fullData);
        fullArray = [];
        fullData.forEach((row) => {
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
        console.log(fullArray);
      
        fullArray.slice(0,20).forEach((a,b) => {
            console.log(length)
            console.log(fullArray[b].title)
            html +=`
            <li id = "title">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>

            `
            
        });
        list.innerHTML = html;
        
        }
    async function getFullRatingsList(){
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
        console.log(fullData);
        fullArray = [];
        fullData.forEach((row) => {
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
        console.log(fullArray);
      
        fullArray.slice(0,20).forEach((a,b) => {
            console.log(length)
            console.log(fullArray[b].title)
            html +=`
            <li id = "title">${fullArray[b].title}
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
        const fullData = full.data;
        console.log(fullData);
        fullArray = [];
        fullData.forEach((row) => {
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
        console.log(fullArray);
        
        fullArray.slice(0,20).forEach((a,b) => {
            console.log(length)
            console.log(fullArray[b].title)
            html +=`
            <li id = "title">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>

            `
            
        });
        list.innerHTML = html;
        
        }
    

getFullRatingsList();
getFullReleaseList();

}
window.onload = windowActions;