async function windowActions() {
    async function getFullRatingsList() {
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
        //console.log(fullData);
        fullArray = [];
        fullData.forEach((row) => {
            fullArray.push({
                title: row.title,
                rating: row.avg_star_rating

            });
        });
        const list = document.querySelector("#rating");
        let html = "";
        fullArray.sort(function (a, b) {
            return b.rating - a.rating;
        })
        //console.log(fullArray);

        fullArray.slice(0, 20).forEach((a, b) => {
            //console.log(length)
            //console.log(fullArray[b].title)
            html +=
                `
            <li id = "title">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
            `

        });
        list.innerHTML = html;

    }
    async function getFullRatingsList() {
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
        //console.log(fullData);
        fullArray = [];
        fullData.forEach((row) => {
            fullArray.push({
                title: row.title,
                rating: row.avg_star_rating

            });
        });
        const list = document.querySelector("#rating");
        let html = "";
        fullArray.sort(function (a, b) {
            return b.rating - a.rating;
        })
        //console.log(fullArray);

        fullArray.slice(0, 20).forEach((a, b) => {
            //console.log(length)
            //console.log(fullArray[b].title)
<<<<<<< Updated upstream
            html += `
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
=======
            html +=`
            <li id = "title"><a href = "./movie-info/movie-info.html">${fullArray[b].title}
>>>>>>> Stashed changes
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
            `
<<<<<<< Updated upstream
=======
            
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
        //console.log(fullArray);
        
        fullArray.slice(0,20).forEach((a,b) => {
            //console.log(length)
            //console.log(fullArray[b].title)
            html +=`
            <li id = "title"><a href = "./movie-info/movie-info.html">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
>>>>>>> Stashed changes

        });
        list.innerHTML = html;

    }
    async function getFullReleaseList() {
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
<<<<<<< Updated upstream
        //console.log(fullData);
        fullArray = [];
        fullData.forEach((row) => {
=======
        console.log(fullData);
        const fullArray = [];
        full.forEach((row) => {
            
            if (row.media_type === "T"){
                fullArray.push({
                    title: row.title,
                    rating: row.avg_star_rating,
                
                });
            }
        });
        console.log(fullArray)
        const list = document.querySelector("#TVrating");
        let html ="";
        fullArray.sort(function(a,b){
            return b.rating - a.rating;
        })
        //console.log(fullArray);
        
        fullArray.forEach((a,b) => {
            //console.log(length)
            //console.log(fullArray[b].title)
            html +=`
            <li id = "title"><a href = "./movie-info/movie-info.html">${fullArray[b].title}
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
>>>>>>> Stashed changes
            fullArray.push({
                title: row.title,
                rating: row.avg_star_rating,
                year: row.year

            });
        });
        const list = document.querySelector("#year");
        let html = "";
        fullArray.sort(function (a, b) {
            return b.year - a.year;
        })
        //console.log(fullArray);

        fullArray.slice(0, 20).forEach((a, b) => {
            //console.log(length)
            //console.log(fullArray[b].title)
<<<<<<< Updated upstream
            html += `
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
=======
            html +=`
            <li id = "title"><a href = "./movie-info/movie-info.html">${fullArray[b].title}
>>>>>>> Stashed changes
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>

            `

        });
        list.innerHTML = html;
<<<<<<< Updated upstream

    }

    async function getMovieDetails() {

    }

    let width = 136;
    let count = 1;

    let list = document.querySelector("ul#rating");
    let listElems = document.querySelectorAll("li#title");

    let position = 0; // scroll position

    document.querySelector('.prev').onclick = function () {
        // shift left
        position += width * count;
        // can't move to the left too much, end of images
        position = Math.min(position, 0)
        list.style.marginLeft = position + 'px';
    };

    document.querySelector('.next').onclick = function () {
        // shift right
        position -= width * count;
        // can only shift the ribbbon for (total ribbon length - visible count) images
        position = Math.max(position, -width * (9 + count));
        list.style.marginLeft = position + 'px';
    };

    let width = 136;
    let count = 1;

    let list = document.querySelector("ul#rating");
    let listElems = document.querySelectorAll("li#title");

=======
        
        }
    getTVReleaseList();
    getTVRatingsList();
    getFullRatingsList();
    getFullReleaseList(); 
    getMOVRatingsList();
    getMOVReleaseList();    
    let width = 136;
    let count = 1;
    
    let list = document.querySelector(".first");
    let list2 = document.querySelector(".second");
    const listElms = document.querySelectorAll("#title li").length;
    console.log(list.length)
>>>>>>> Stashed changes
    let position = 0; // scroll position

    document.querySelector('.prev').onclick = function () {
        // shift left
        position += width * count;
        // can't move to the left too much, end of images
        position = Math.min(position, 0)
        list.style.marginLeft = position + 'px';
<<<<<<< Updated upstream
    };

    document.querySelector('.next').onclick = function () {
        // shift right
        position -= width * count;
        // can only shift the ribbbon for (total ribbo  n length - visible count) images
        position = Math.max(position, -width * (9 + count));
        list.style.marginLeft = position + 'px';
    };
    getFullRatingsList();
    getFullReleaseList();
=======
        
        };
        
        document.querySelector('.next').onclick = function() {
            // shift right
            position -= width * count;
            // can only shift the ribbbon for (total ribbon length - visible count) images
            position = Math.max(position, -width * (9 + count));
            list.style.marginLeft = position + 'px';
            console.log(listElms - 10 * width)
            

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

>>>>>>> Stashed changes
}
window.onload = windowActions;