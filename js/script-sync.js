'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context){
  context.zap = null;
  var elementsCharges = {
    "dom": false,
    "zap": false,
    "arrondissements": false,
    "api-google-map": false,
    "script-async": false
  };

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
        context.init();
      }
    }
  }

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

  chargerScriptAsync('js/script-async.js', function(){
    controleurChargement("script-async");
  });

// Chargement asynchrone des arrondissements.
  chargerScriptAsync('js/arrondissements.js', function () {
    controleurChargement("arrondissements");
  });

// Fonction appelée pour indiquer que l'API Google Map est chargé.
  window.apiGoogleMapCharge = function() {
    controleurChargement("api-google-map");
  };

  ajax('zap-ajax-json-get.php', function(zap){
    context.zap = JSON.parse(zap);
    controleurChargement("zap");
  });
})(com.dinfogarneau.cours526);
