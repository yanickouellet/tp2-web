'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){
  // Carte
  context.carte = null;
  context.infoWindow = null;
  context.positionGeoloc = null;

  context.init = function() {
    context.initCarte();
  };

  context.initCarte = function() {
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

    context.carte = new google.maps.Map(document.getElementById("carte-canvas"), optionsCarte);

    // Est-ce que le navigateur supporte la géolocalisation ?
    if ( typeof navigator.geolocation != "undefined" ) {
      navigator.geolocation.getCurrentPosition(context.getCurrentPositionSuccess, context.getCurrentPositionError, {});
    } else {
      context.afficherReperesCarte();
      context.genererInterfaceHtml();
    }
  };

  // Fonction appelée lors du succès de la récupération de la position.
  context.getCurrentPositionSuccess = function(position) {
    context.positionGeoloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var icon = { url: 'images/male.png' };
    var repere = new google.maps.Marker( {"position": context.positionGeoloc, "map": context.carte, "icon": icon} );
    context.carte.setCenter(context.positionGeoloc);
    context.afficherReperesCarte();
    context.genererInterfaceHtml();
  };

  // Fonction appelée lors de l'échec (refus ou problème) de la récupération de la position.
  context.getCurrentPositionError = function(erreur) {
    var positionInit = new google.maps.LatLng(46.7936854,-71.2625485);
    carte.setCenter(positionInit);
    afficherReperesCarte();
    genererInterfaceHtml();
  };

  // Fonction responsable d'afficher les repères sur la carte.
  context.afficherReperesCarte = function() {
    var zaps = context.zap;

    util.foreach(zaps, function(zap){
      var position = new google.maps.LatLng(zap.latitude, zap.longitude);
      var icone = 'images/logo-wifij.svg';
      if(context.positionGeoloc != null) {
        var distance = google.maps.geometry.spherical.computeDistanceBetween(context.positionGeoloc, position);
        if(distance <= 5000)
          icone = 'images/logo-wifiv.svg';
      }

      var repere = new google.maps.Marker({
        position: position,
        icon: icone,
        map: context.carte
      });
      google.maps.event.addListener(repere, 'click', function() {
        if(typeof zap.avis == "undefined") {
          util.ajax('avis-ajax-json-get.php?id=' + zap.id, function(data) {
            zap.avis = JSON.parse(data).avis;
            context.afficherInfoWindow(zap, repere);
          });
        } else {
          context.afficherInfoWindow(zap, repere);
        }
      });
    });
  };

  // Fonction responsable de générer l'interface graphique HTML.
  context.genererInterfaceHtml =  function() {
    var config = util.$('panneau-config');

    var kmlLayer = new google.maps.KmlLayer({
      url: 'http://web.yanickouellet.com/rtc-trajets.kml',
      suppressInfoWindows: true
     // map: carte
    });
  };

  context.afficherInfoWindow = function(zap, repere) {
    if(context.infoWindow == null)
      context.infoWindow = new google.maps.InfoWindow();
    context.infoWindow.setContent(context.genererHtmlInfoWindow(zap));
    context.infoWindow.close();
    context.infoWindow.open(context.carte, repere);
  };

  context.genererHtmlInfoWindow = function(zap) {
    var contenu = document.createElement('div');
    contenu.id = "info-window";
    var titre = document.createElement('h2');
    titre.appendChild(document.createTextNode(zap.batiment));
    contenu.appendChild(titre);

    var adresse = document.createElement('p');
    adresse.appendChild(document.createTextNode(zap.noCivique + ' ' + zap.rue + ', ' + zap.arrondissement ));
    contenu.appendChild(adresse);

    var avis = document.createElement('ul');
    for(var i = 0; i < zap.avis.length; i++) {
      var elem = document.createElement('li');
      elem.appendChild(document.createTextNode(zap.avis[i]));
      avis.appendChild(elem);
    }

    titre = document.createElement('h2');
    titre.appendChild(document.createTextNode('Avis'));

    contenu.appendChild(titre);
    contenu.appendChild(avis);

    var form = document.createElement('form');
    form.action = "#";
    var inputAvis = document.createElement('input');
    inputAvis.type = 'text';
    inputAvis.id = 'avis';
    form.appendChild(inputAvis);

    var submit = document.createElement('input');
    submit.value = 'Envoyer';
    submit.type = 'submit';
    form.appendChild(submit);

    contenu.appendChild(form);

    submit.addEventListener('click', function(e){
      e.preventDefault();
      util.ajax('ajout-avis.php',
        function(data){
          var nouvelAvis = JSON.parse(data);
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(nouvelAvis.avis));
          avis.insertBefore(li, avis.childNodes[0]);
          zap.avis.push(nouvelAvis);
          
          li.className = "success";
          setTimeout(function(){ li.className = "";}, 2000);

        },
        function(data) {
          var erreur = JSON.parse(data);
          alert(erreur.message);
        }, {
        "id": zap.id,
        "avis": inputAvis.value
      })
    }, false);

    return contenu;
  };
})(com.dinfogarneau.cours526, com.dinfogarneau.cours526.util);