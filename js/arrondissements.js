'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){

  context.arrondissements = null;

  context.parsePolygone = function(geo) {
    var polygones = [];
    var stringPolygones = geo.match(/\([^\(\)]+\)/g);
    for (var i = 0; stringPolygones != null && i < stringPolygones.length; i++){
      var coordonnees = stringPolygones[i].match(/-?\d+\.?\d*/g);
      polygones.push([]);
      for (var j = 0; coordonnees != null && j < coordonnees.length; j+=2){
        polygones[i].push(new google.maps.LatLng(Number(coordonnees[j+1]), Number(coordonnees[j])));
      }
    }
    return polygones;
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