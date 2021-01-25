function cl(message) {
    return console.log(message);
}

_id = function (id) { return document.getElementById(id); };


//https://nominatim.openstreetmap.org/search?q=17+Strada+Pictor+Alexandru+Romano%2C+Bukarest&format=geojson

//Déclaration des variables
var mymap;
var inputAdresse = document.querySelector('#inputAdresse');
var datalistInputAdresse = document.querySelector('#datalistInputAdresse');
var zoneAlert = document.getElementsByClassName('zoneAlert')[0];
let zoneAffichageCarte = document.getElementsByClassName('map-container')[0];
hiddenInput = document.getElementById(document.querySelector('#inputAdresse').getAttribute('id') + '-hidden'),


    //Ecouteurs d'evenements
    window.addEventListener("load", function (event) {

    });
document.querySelector('#inputAdresse').addEventListener('input', function () { autocompletionInput(inputAdresse, datalistInputAdresse, zoneAlert, 'https://nominatim.openstreetmap.org/search', { 'street': inputAdresse.value, 'country': 'France', format: 'json' }) })
document.querySelector('#inputAdresse').addEventListener('change', function () {

    tabCoordonnees = hiddenInput.value.split(',');
    lon = parseFloat(tabCoordonnees[0]);
    lat = parseFloat(tabCoordonnees[1]);
    //Afficher la carte
    showMap(lon, lat, 10);

    //Récuperer les extrémités de la carte
    NE_lat = mymap.getBounds()._northEast.lat;
    NE_lng = mymap.getBounds()._northEast.lng;
    SW_lat = mymap.getBounds()._southWest.lat;
    SW_lng = mymap.getBounds()._southWest.lng;

    //Dessiner la diagonale pour vérifier si les valeurs sont correct
    var polygon = L.polygon([
        [NE_lat, NE_lng],
        [SW_lat, SW_lng]
    ]).addTo(mymap);


    console.log(mymap.getBounds())
    console.log('NE_lat: ' + NE_lat + 'NE_lng: ' + NE_lng + 'SW_lat: ' + SW_lat + 'SW_lng: ' + SW_lng);

    showStations(NE_lat, NE_lng, SW_lat, SW_lng);

})
//Stocker la valeur de l'option selectionné dans la hiddenInput pour la recuperer au input
document.querySelector('input[list]').addEventListener('input', function (e) {
    var input = e.target,
        list = input.getAttribute('list'),
        options = document.querySelectorAll('#' + list + ' option'),
        hiddenInput = document.getElementById(input.getAttribute('id') + '-hidden'),
        inputValue = input.value;

    hiddenInput.value = inputValue;
    //console.log('hiddenInput: ' + hiddenInput.value)

    for (var i = 0; i < options.length; i++) {
        var option = options[i];

        if (option.innerText === inputValue) {
            hiddenInput.value = option.getAttribute('data-value');
            break;
        }
    }
});

function autocompletionInput(nodeInput, nodeDatalist, nodeAlert, urlReq, paramsReq,) {
    //Vider la zone d'alert
    nodeAlert.innerHTML = '';
    //Vérifier que le champ ville a au moins 3 lettres avant de faire l'appel pour éviter réponses trop grande
    if (nodeInput.value.length >= 3) {
        $get(urlReq, paramsReq)
            .then((req) => {
                //Vider la datalist
                nodeDatalist.innerHTML = '';
                //Convertir la réponse text en JSON
                data = JSON.parse(req.responseText);

                //console.log(data)
                //Création des options dans datalist
                for (i = 0; i < data.length; i++) {
                    //Creer l'element option
                    let option = document.createElement('option');
                    //Récupérer le nom de la ville
                    let villeNom = data[i].display_name;
                    let lat = data[i].lat;
                    let lon = data[i].lon;
                    //Ajouter le nom de la ville en value
                    option.setAttribute('data-value', data[i].lat + ',' + data[i].lon);
                    //Ajouter les cordonnées en noeud text
                    option.append(villeNom);
                    nodeDatalist.append(option)
                }
            })
            .catch((req) => {
                //Affichage de l'erreur récupération BDD
                zoneAlert.innerHTML = '';
                //Afficher le message d'erreur
                zoneAlert.innerHTML += `
                <div class="alert alert-danger" role="alert">
                    Suite à un soucis technique l'autocomplétion n'est pas disponible. Veuillez entrer le nom de la ville puis de valider.
                </div>`;
            });
    }
    else {
        //Vider la zone alert si jamais une alert est déjà présente
        document.getElementsByClassName('zoneAlert')[0].innerHTML = '';
        //Afficher le message d'erreur
        document.getElementsByClassName('zoneAlert')[0].innerHTML += `
                <div class="alert alert-danger" role="alert">
                    Les villes s'afficheront uniquement à partir de 3 caractères.
                </div>`;
    }
}

/*Récupération du accessToken
function getAccessToken_NetatmoApi() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", "5ffc5befccb0da524b20861c|20832aa7e0dfa5873598919b947e62a1");
    urlencoded.append("client_id", "5ffc5c2cbd10c6698151b1cf");
    urlencoded.append("client_secret", "NfDkkPDA6qEiQ25HwOHqsIvsOCybFhL5GgBOTF8");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://api.netatmo.com/oauth2/token", requestOptions)
        .then(response => response.text())
        //.then(result => console.log(JSON.parse(result).access_token))
        .then(function (result) {
            const token = JSON.parse(result).access_token;

        })
        .catch(error => console.log('error', error));
}*/

function showStations(NE_lat, NE_lng, SW_lat, SW_lng) {
    //Récupération du refresh_token
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", "5ffc5befccb0da524b20861c|20832aa7e0dfa5873598919b947e62a1");
    urlencoded.append("client_id", "5ffc5c2cbd10c6698151b1cf");
    urlencoded.append("client_secret", "NfDkkPDA6qEiQ25HwOHqsIvsOCybFhL5GgBOTF8");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://api.netatmo.com/oauth2/token", requestOptions)
        .then(response => response.text())
        //.then(result => console.log(JSON.parse(result).access_token))
        .then(function (result) {
            const token = JSON.parse(result).access_token;

            var myHeaders = new Headers();

            //Récupération des bornes méteos
            myHeaders.append("Authorization", `Bearer ${token}`);
            var urlencoded = new URLSearchParams();

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            //Récupération des données NetATMO
            fetch(`https://api.netatmo.com/api/getpublicdata?lat_ne=${NE_lat}&lon_ne=${NE_lng}&lat_sw=${SW_lat}&lon_sw=${SW_lng}&filter=false`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    data = JSON.parse(result)
                    //Exemple récupération coordonnées d'une borne
                    lat = data.body[0].place.location[0];
                    lon = data.body[0].place.location[1];
                    //console.log(lat);
                    //console.log(lon)
                    console.log(data.body[0].place)
                    //var markers = L.markerClusterGroup();
                    for (let i = 0; i < 1; i++) {

                        lat = data.body[i].place.location[0];
                        lon = data.body[i].place.location[1];

                        let marker = L.marker([lon, lat]);
                        marker.addTo(mymap);

                        console.log(marker);


                    }
                    //markers.addTo(mymap);

                    //Traitement des données bornes météos


                })
                .catch(error => console.log('error', error));

        })
        .catch(error => console.log('error netatmo', error));
}

function showMap(lon, lat, zoom) {
    //Je supprime la carte précendente
    let main = _id('main-container');
    main.removeChild(_id('map'));

    //Et en créé une nouvelle carte avec les informations mises a jour
    let map = document.createElement('div');
    map.setAttribute('id', 'map');
    main.appendChild(map);

    //Affichage de la carte
    mymap = L.map('map', { zoomControl: true }).setView([lon, lat], zoom);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 4,
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGhlb2xlYW8iLCJhIjoiY2tpZG91MDJzMWw2MDJ4bzVianp6cXBsaCJ9.ps_BFy88xj0l6kMkf9ivgA'
    }).addTo(mymap);

}
//alert('test');