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


//Ecouteurs d'evenements
document.querySelector('#inputAdresse').addEventListener('input', function () { autocompletionInput(inputAdresse, datalistInputAdresse, zoneAlert, 'https://nominatim.openstreetmap.org/search', { 'street': inputAdresse.value, 'country': 'France', format : 'json'}) })
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

                console.log(data)
                //Création des options dans datalist
                for (i = 0; i < data.length; i++) {
                    //Creer l'element option
                    let option = document.createElement('option');
                    //Récupérer le nom de la ville
                    let villeNom = data[i].display_name;
                    console.log(villeNom);
                    //Ajouter le noeud attribut
                    option.setAttribute('value', villeNom);
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