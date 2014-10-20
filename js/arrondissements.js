'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){

  context.arrondissements = null;

  context.parsePolygone = function(geo) {
    var coordsGoogle = [];
    var polygones = geo.match(/\([^\(\)]+\)/g);
    if (polygones !== null){
      for (var i = 0; i < polygones.length; i++){
        var coordonnees = polygones[i].match(/-?\d+\.?\d*/g);
        if (coordonnees !== null){
          for (var j = 0; j < coordonnees.length; j+=2){
            coordsGoogle.push(new google.maps.LatLng(Number(coordonnees[j+1]), Number(coordonnees[j])));
          }
        }
      }
    }
    return coordsGoogle;
  };

  context.initArrondissements = function() {
    context.arrondissements = [];
    var xml = context.arrondissementsXml;
    var arrond = xml.getElementsByTagName('Arrondissement');
    var couleurs = ['#FFFF66','#66FFFF','#FF66FF','#FF6600','#996633','#66FF33'];
    for (var i = 0;i < arrond.length; i++) {
      var geo = '';
      for (var j = 0;j < arrond[i].getElementsByTagName('Geometrie')[0].childNodes.length; j++) {
        geo += arrond[i].getElementsByTagName('Geometrie')[0].childNodes[j].nodeValue;
      }
      var poly = context.parsePolygone(geo);
      if (poly.length) {
        var polygone = new google.maps.Polygon({
          paths : poly,
          strokeColor : couleurs[i],
          strokeOpacity : 0.8,
          strokeWeight : 2,
          fillColor : couleurs[i],
          fillOpacity : 0.35
        });
        context.arrondissements.push({'nom':arrond[i].getElementsByTagName('Nom')[0].firstChild.nodeValue,
                                      'polygone':polygone});
        context.arrondissements[i].polygone.setMap(context.carte);
      }
    }

  };

})(com.dinfogarneau.cours526, com.dinfogarneau.cours526.util);