// Indique quels éléments ont déjà été chargés.
var elementsCharges = {"dom": false, "zap": false, "arrondissements": false, "api-google-map": false};

// Fonction contrôlant le chargement asynchrone de divers éléments.
function controleurChargement(nouvElemCharge) {
	console.log('controleurChargement: Nouvel élément chargé "' + nouvElemCharge + '".');
	
	if (typeof elementsCharges[nouvElemCharge] != "undefined") {
		elementsCharges[nouvElemCharge] = true;
		var tousCharge = true;
		for (var elem in elementsCharges) {
			if ( ! elementsCharges[elem] )
				tousCharge = false;
		}
		if (tousCharge) {
			console.log('controleurChargement: Tous les éléments ont été chargés.');
			traitementPostChargement();
		} else {
			console.log('controleurChargement: Il reste encore des éléments à charger.');
		}
	}
}

// Gestionnaire d'événements pour le chargement du DOM.
window.addEventListener('DOMContentLoaded', function() {
		console.log('DOM chargé.');
		controleurChargement("dom");

        $('configuration').parentNode.addEventListener('click', function() {
            var config = $('panneau-config');
            if (config.style.visibility=="hidden" || config.style.visibility==""){
                config.style.visibility="visible";
            } else {
                config.style.visibility="hidden";
            }
        }, false);

        chargerScriptAsync('https://maps.googleapis.com/maps/api/js?sensor=true&callback=apiGoogleMapCharge', null);
	}, false);
	
// Chargement asynchrone des zap.
chargerScriptAsync('js/zap.js', function () {
		console.log('Zap chargé.');
		controleurChargement("zap");	
	});
// Chargement asynchrone des arrondissements.
chargerScriptAsync('js/arrondissements.js', function () {
		console.log('Arrondissements chargé.');
		controleurChargement("arrondissements");		
	});

// Fonction appelée pour indiquer que l'API Google Map est chargé.
function apiGoogleMapCharge() {
		console.log('API Google Map chargé.');
		controleurChargement("api-google-map");
}

// Fonction responsable des traitements post-chargement.
function traitementPostChargement() {
	console.log('Traitement post-chargement.');
	initCarte();
	afficherReperesCarte();
	genererInterfaceHtml();
}

// Référence à la carte Google (variable globale).
var carte;

function initCarte() {
	// Utilisation de la position par défaut.
	var positionInit = new google.maps.LatLng(46.7936854,-71.2625485);
	
	// Object JSON pour les options de la carte (sans la position initiale).
	var optionsCarte = {
		"center": positionInit,
		"zoom": 14,
		"mapTypeId": google.maps.MapTypeId.ROADMAP,
		"mapTypeControlOptions": {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, 
			position: google.maps.ControlPosition.TOP_CENTER
		}
	};

	carte = new google.maps.Map(document.getElementById("carte-canvas"), optionsCarte);
	
	// Est-ce que le navigateur supporte la géolocalisation ?
	if ( typeof navigator.geolocation != "undefined" ) {
		console.log('Le navigateur supporte la géolocalisation.');
		navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess, getCurrentPositionError, {});
	} else {
		console.log('Le navigateur NE supporte PAS la géolocalisation.');
	}
}  // Fin de la fonction "initCarte"

// Fonction appelée lors du succès de la récupération de la position.
function getCurrentPositionSuccess (position) {	
	// Utilisation de la position de l'utilisateur.
	console.log('Position obtenue : ' + position.coords.latitude + ', ' + position.coords.longitude);
	var positionInit = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var icon = { url: 'http://goo.gl/Tfv9Al' };
	var repere = new google.maps.Marker( {"position": positionInit, "map": carte, "icon": icon} );
	carte.setCenter(positionInit);
}

// Fonction appelée lors de l'échec (refus ou problème) de la récupération de la position.
function getCurrentPositionError(erreur) {	
	console.log('Utilisation de la position par défaut.');
	var positionInit = new google.maps.LatLng(46.7936854,-71.2625485);
	carte.setCenter(positionInit);
}

// Fonction responsable d'afficher les repères sur la carte.
function afficherReperesCarte() {
	for (var i=0; i < reperes.length; i++) {
		var posRepere = new google.maps.LatLng(reperes[i].lat, reperes[i].long);
        var icon = { url: 'http://goo.gl/4aMEXO' };
        var repere = new google.maps.Marker( {"position": posRepere, "map": carte, "icon": icon } );
	}
}

// Fonction responsable de générer l'interface graphique HTML.
function genererInterfaceHtml() {
    var config = $('panneau-config');
	
	var kmlLayer = new google.maps.KmlLayer({
		url: 'http://web.yanickouellet.com/rtc-trajets.kml',
		suppressInfoWindows: true,
		map: carte
	});
}