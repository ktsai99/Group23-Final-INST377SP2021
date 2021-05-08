"use strict";

async function windowActions()
{
    const URL_invoice_id = new URLSearchParams(window.location.search).get('i_id')
    const URL_movie_id = new URLSearchParams(window.location.search).get('id');
    const URL_type = new URLSearchParams(window.location.search).get('type');

    document.getElementById("cancel").onclick = async function() {
        
        const endpoint =`/api/transaction/${URL_invoice_id}`;
        const request = await fetch(endpoint, {method: 'DELETE'});
        const res = await request.json();
        window.location.href = "/";
    };

    document.getElementById("yes").onclick = async function() {
            
        const endpoint =`/api/count/${URL_type}/${URL_movie_id}`;
        const request = await fetch(endpoint, {method: 'PUT'});
        const res = await request.json();
        window.location.href = "/";
    };
}
window.onload = windowActions;