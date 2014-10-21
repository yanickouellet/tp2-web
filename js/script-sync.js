'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){
  //Liste des différentes Zap
  context.zap = null;

  var elementsCharges = {
    "dom": false,
    "zap": false,
    "arrondissements": false,
    "api-google-map": false,
    "script-async": false,
    "xml-arrondissements": false,
    "menu": false
  };

  // Controller de chargement qui est appelé à la fin du chargement de chaque ressource.
  // Lorsque tout est chargé, il procède à l'initialisation de l'application
  context.controleurChargement = function(nouvElemCharge) {
    if (typeof elementsCharges[nouvElemCharge] != "undefined") {
      elementsCharges[nouvElemCharge] = true;
      var tousCharge = true;
      for (var elem in elementsCharges) {
        if ( ! elementsCharges[elem] )
          tousCharge = false;
      }
      if (tousCharge) {
        context.init();
      }
    }
  };

  window.addEventListener('DOMContentLoaded', function() {
    context.controleurChargement("dom");
    util.chargerScriptAsync('https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry&callback=com.dinfogarneau.cours526.apiGoogleMapCharge', null);
  }, false);

  util.chargerScriptAsync('js/script-async.js', function(){
    context.controleurChargement("script-async");
  });

  util.chargerScriptAsync('js/arrondissements.js', function () {
    context.controleurChargement("arrondissements");
  });

  util.chargerScriptAsync('js/menu.js', function () {
    context.controleurChargement("menu");
  });

  // Fonction appelée pour indiquer que l'API Google Map est chargée.
  context.apiGoogleMapCharge = function() {
    context.controleurChargement("api-google-map");
  };

  util.ajax('zap.php', function(zap){
      context.zap = JSON.parse(zap);
      context.controleurChargement("zap");
    },function(data){
      try{
        alert(JSON.parse(data).message);
      }
      catch(e){
        alert('Impossible de charger les Zap');
      }
      context.controleurChargement("zap");
    }
  );

  util.ajax('proxy-arrondissements.php', function(xml){
      context.arrondissementsXml = xml;
      context.controleurChargement("xml-arrondissements");
    },function(){
      alert('Impossible de charger les arrondissements');
      context.controleurChargement("xml-arrondissements");
    }
  );
})(com.dinfogarneau.cours526, com.dinfogarneau.cours526.util);
