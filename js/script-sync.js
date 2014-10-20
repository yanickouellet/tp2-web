'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){
  context.zap = null;
  var elementsCharges = {
    "dom": false,
    "zap": false,
    "arrondissements": false,
    "api-google-map": false,
    "script-async": false,
    "xml-arrondissements": false
  };

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

    util.$('configuration').parentNode.addEventListener('click', function() {
      var config = util.$('panneau-config');
      if (config.style.visibility=="hidden" || config.style.visibility==""){
        config.style.visibility="visible";
      } else {
        config.style.visibility="hidden";
      }
    }, false);

    util.chargerScriptAsync('https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry&callback=com.dinfogarneau.cours526.apiGoogleMapCharge', null);
  }, false);

  util.chargerScriptAsync('js/script-async.js', function(){
    context.controleurChargement("script-async");
  });

// Chargement asynchrone des arrondissements.
  util.chargerScriptAsync('js/arrondissements.js', function () {
    context.controleurChargement("arrondissements");
  });

// Fonction appelée pour indiquer que l'API Google Map est chargé.
  context.apiGoogleMapCharge = function() {
    context.controleurChargement("api-google-map");
  };

  util.ajax('zap-ajax-json-get.php', function(zap){
            context.zap = JSON.parse(zap);
            context.controleurChargement("zap");
        },function(message){
            alert(message);
        }
    );

  util.ajax('proxy-arrondissements.php', function(xml){
          context.arrondissementsXml = xml;
          context.controleurChargement("xml-arrondissements");
      },function(message){
          alert(message);
      }
  );
})(com.dinfogarneau.cours526, com.dinfogarneau.cours526.util);
