/*let mymap = L.map('map').setView([46.227638,2.213749], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 6,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGhlb2xlYW8iLCJhIjoiY2tpZG91MDJzMWw2MDJ4bzVianp6cXBsaCJ9.ps_BFy88xj0l6kMkf9ivgA'
}).addTo(mymap);
*/


//https://nominatim.openstreetmap.org/search?q=17+Strada+Pictor+Alexandru+Romano%2C+Bukarest&format=geojson

//Déclaration des variables
var inputAdresse = document.querySelector('#inputAdresse');
var datalistInputAdresse = document.querySelector('#datalistInputAdresse');
var zoneAlert = document.getElementsByClassName('zoneAlert')[0];
let zoneAffichageCarte = document.getElementById('map');
hiddenInput = document.getElementById(document.querySelector('#inputAdresse').getAttribute('id') + '-hidden'),

    //Ecouteurs d'evenements
    document.querySelector('#inputAdresse').addEventListener('input', function () { autocompletionInput(inputAdresse, datalistInputAdresse, zoneAlert, 'https://nominatim.openstreetmap.org/search', { 'street': inputAdresse.value, 'country': 'France', format: 'json' }) })
document.querySelector('#inputAdresse').addEventListener('change', function () {
    tabCoordonnees = hiddenInput.value.split(',');
    lon = parseFloat(tabCoordonnees[0]);
    lat = parseFloat(tabCoordonnees[1]);
    //Affichage de la carte
    //Affichage de la carte
    let mymap = L.map('map').setView([lon, lat], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 12,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGhlb2xlYW8iLCJhIjoiY2tpZG91MDJzMWw2MDJ4bzVianp6cXBsaCJ9.ps_BFy88xj0l6kMkf9ivgA'
    }).addTo(mymap);
})
//Stocker la valeur de l'option selectionné dans la hiddenInput pour la recuperer au input
document.querySelector('input[list]').addEventListener('input', function (e) {
    var input = e.target,
        list = input.getAttribute('list'),
        options = document.querySelectorAll('#' + list + ' option'),
        hiddenInput = document.getElementById(input.getAttribute('id') + '-hidden'),
        inputValue = input.value;

    hiddenInput.value = inputValue;

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
                    console.log(villeNom);
                    //Ajouter le nom de la ville en value
                    option.setAttribute('data-value', data[i].lat + ',' + data[i].lon);
                    //Ajouter les cordonnées en noeud text
                    option.append(villeNom);
                    nodeDatalist.append(option)
                }
            })
            .catch((req) => {
                //Affichage de l'erreur récupération BDD
                document.getElementsByClassName('zoneAlert')[0].innerHTML = '';
                //Afficher le message d'erreur
                document.getElementsByClassName('zoneAlert')[0].innerHTML += `
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
    console.log('ok')

}


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
        .then(result => console.log(JSON.parse(result).access_token))
        .catch(error => console.log('error', error));
}
function getStations(lat_NE, lon_NE, lat_SW, lon_SW) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 5ffc5befccb0da524b20861c|f9055d4e55d4901c71893c23b1a4e1e7");
    
    var urlencoded = new URLSearchParams();
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("https://api.netatmo.com/api/getpublicdata?lat_ne=48.5833&lon_ne=7.75&lat_sw=44.8333&lon_sw=-0.5667&filter=false", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

function showStations(urlReq, paramsReq) {
    $get(urlReq, paramsReq)
        .then((req) => {
            //Convertir la réponse text en JSON
            data = JSON.parse(req.responseText);
            console.log(data)
            //Afficher les bornes
            for (i = 0; i < data.length; i++) {

            }
        })
        .catch((req) => {
            //Affichage de l'erreur récupération BDD
            document.getElementsByClassName('zoneAlert')[0].innerHTML = '';
            //Afficher le message d'erreur
            document.getElementsByClassName('zoneAlert')[0].innerHTML += `
        <div class="alert alert-danger" role="alert">
            L'affichage des bornes météos netatmo est indisponible.
        </div>`;
        });
}
//console.log(getStations(48.5833, 7.75, 44.8333, 0.5667));
accessToken = getAccessToken_NetatmoApi();
//console.log(accessToken)
showStations();
getStations();