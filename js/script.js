
//Afficher la carte
let mymap = L.map('map').setView([46.227638,2.213749], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 6,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGhlb2xlYW8iLCJhIjoiY2tpZG91MDJzMWw2MDJ4bzVianp6cXBsaCJ9.ps_BFy88xj0l6kMkf9ivgA'
}).addTo(mymap);