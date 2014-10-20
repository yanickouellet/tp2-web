'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context){
  // Carte
  var carte = null;
  var infoWindow = null;

  context.init = function() {
    initCarte();
    afficherReperesCarte();
    genererInterfaceHtml();
  }

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
    var zaps = context.zap;
    foreach(zaps, function(zap){
      var repere = new google.maps.Marker({
        position: new google.maps.LatLng(zap.latitude, zap.longitude),
        icon: { url: 'images/logo-wifiv.svg'},
        map: carte
        });
    });
  }

  // Fonction responsable de générer l'interface graphique HTML.
  function genererInterfaceHtml() {
    var config = $('panneau-config');

    var kmlLayer = new google.maps.KmlLayer({
      url: 'http://web.yanickouellet.com/rtc-trajets.kml',
      suppressInfoWindows: true
     // map: carte
    });
  }
})(com.dinfogarneau.cours526);