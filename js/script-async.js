'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){
  // Carte de l'application (google.maps.Map)
  context.carte = null;
  // InfoWindow utilisée pour toutes les Zap
  context.infoWindow = null;
  // Position géolocalisée de l'utilisateur (reste null s'il ne la partage pas)
  context.positionGeoloc = null;
  // Layer kml pour les trajets du RTC
  context.layerTrajets = null;

  // Fonction exécuée après l'initialisation de la carte, chargeant tous les éléments sur la carte
  context.postInit = function() {
    context.infoWindow = new google.maps.InfoWindow();
    context.layerTrajets = new google.maps.KmlLayer({
      url: 'http://web.yanickouellet.com/rtc-trajets.kml',
      suppressInfoWindows: true
    });

	  context.afficherReperesCarte();
    context.chargerArrondissements();
    context.chargerMenu();
  };

  // Fonction initialisant l'application, appelée par le controlleur de chargement
  // lorsque toutes les ressources sont chargées
  context.init = function() {
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
      context.postInit();
    }
  };

  // Fonction appelée lors du succès de la récupération de la position.
  context.getCurrentPositionSuccess = function(position) {
    context.positionGeoloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var icon = { url: 'images/male.png' };
    var repere = new google.maps.Marker( {"position": context.positionGeoloc, "map": context.carte, "icon": icon} );
    context.carte.setCenter(context.positionGeoloc);
    context.postInit();
  };

  // Fonction appelée lors de l'échec (refus ou problème) de la récupération de la position.
  context.getCurrentPositionError = function(erreur) {
    var positionInit = new google.maps.LatLng(46.7936854,-71.2625485);
    carte.setCenter(positionInit);
    context.postInit();
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
      zap.repere = repere;

      google.maps.event.addListener(repere, 'click', function() {
        context.afficherInfoWindow(zap);
      });
    });
  };

  // Affiche un InfoWindow et charge de facçon asynchrone les données sur un
  // avis si nécessaire
  context.afficherInfoWindow = function(zap) {
    context.infoWindow.close();
    if(typeof zap.avis == "undefined") {
      util.ajax('avis.php?id=' + zap.id, function(data) {
        zap.avis = JSON.parse(data).avis;
        context.ouvrirInfoWindow(zap);
      }, function(data) {
        try{
          alert(JSON.parse(data).message);
        }
        catch(e){
          alert('Impossible d\'afficher les avis');
        }
      });
    } else {
      context.ouvrirInfoWindow(zap);
    }
  };

  // Permet d'ouvrir une infoWindow et de configurer son contenu
  context.ouvrirInfoWindow = function(zap) {
    context.infoWindow.setContent(context.genererHtmlInfoWindow(zap));
    context.infoWindow.open(context.carte, zap.repere);
  };

  // Permet de générer le contenu d'une infoWindow et de gérer les événements appropriés
  // pour l'envoie d'avis
  context.genererHtmlInfoWindow = function(zap) {
    var contenu = document.createElement('div');
    contenu.id = "info-window";
    var titre = document.createElement('h2');
    titre.appendChild(document.createTextNode(zap.batiment));
    contenu.appendChild(titre);

    var adresse = document.createElement('p');
    adresse.appendChild(document.createTextNode((zap.noCivique != null ? zap.noCivique : '') + ' '
      + (zap.rue != null ? zap.rue : '') + ', ' + (zap.arrondissement != null ? zap.arrondissement : '') ));
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


    // Gestion des événements pour l'envoie de l'avis
    submit.addEventListener('click', function(e){
      e.preventDefault();
      if(inputAvis.value.trim() == '')
        return;

      util.ajax('ajout-avis.php',
        function(data){
          var nouvelAvis = JSON.parse(data);
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(nouvelAvis.avis));
          avis.insertBefore(li, avis.childNodes[0]);
          zap.avis.unshift(nouvelAvis.avis);

          li.className = "succes";
          setTimeout(function(){ li.className = "";}, 4000);

        },
        function(data) {
          try{
            alert(JSON.parse(data).message);
          }
          catch(e){
            alert('Impossible d\'ajouter l\'avis');
          }
        }, {
        "id": zap.id,
        "avis": inputAvis.value
      });

      inputAvis.value = '';
    }, false);

    return contenu;
  };
})(com.dinfogarneau.cours526, com.dinfogarneau.cours526.util);