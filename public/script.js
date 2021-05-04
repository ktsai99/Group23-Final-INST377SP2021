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
            html += `
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>
            `

        });
        list.innerHTML = html;

    }
    async function getFullReleaseList() {
        const endpoint = "/api/movies";
        const request = await fetch(endpoint);
        const full = await request.json();
        const fullData = full.data;
        //console.log(fullData);
        fullArray = [];
        fullData.forEach((row) => {
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
            html += `
            <li id = "title"><a href = "./pages/movie-info/movie-info.html">${fullArray[b].title}
            <ul>
            <li id = "star-rating" >${fullArray[b].rating}</li>
            </ul>
            </li>

            `

        });
        list.innerHTML = html;

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
        // can only shift the ribbbon for (total ribbo  n length - visible count) images
        position = Math.max(position, -width * (9 + count));
        list.style.marginLeft = position + 'px';
    };
    getFullRatingsList();
    getFullReleaseList();
}
window.onload = windowActions;