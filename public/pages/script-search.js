"use strict";

async function windowActions()
{
//Search bar query
const endpoint = "/api/movies";

const request = await fetch(endpoint);
const movies = await request.json();

function findMatches(wordToMatch, movies) {
    return movies.filter(m => {
        const regex = new RegExp(wordToMatch, "gi");
        return m.title.match(regex);
    });
}
function displayMatches(e) {
    if (e.target.value === "") {
        suggestions.innerHTML = "";
        return;
    }
    
const matchArray = findMatches(e.target.value, movies);
        const html = matchArray.map(m => {
            return `
                <li>
                    <ul>
                        <li class="address"> ${m.title} — ${m.avg_star_rating} ${m.pricing}</li>
                    </ul>
                </li>
            `;
        }).join('');

        suggestions.innerHTML = html;
    }
    const searchInput = document.querySelector('.search');
    const form = document.querySelector(".search-form");
    const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", (evt) => { evt.preventDefault(); displayMatches(evt) });
searchInput.addEventListener("keyup", (evt) => { evt.preventDefault(); displayMatches(evt) });       
}
window.onload = windowActions;