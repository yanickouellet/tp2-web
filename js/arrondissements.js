'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context){
  // Liste des arrondissements (lorsque qu'initialis�s, chacun aura la propri�t� "nom" et la propri�t� "polygone")
  context.arrondissements = null;

  // Parse les coordonn�es au format Well-Known texte et retourne un vecteur de vecteurs de coordonn�es
  // que google maps utilisera pour dessiner comme un grand les polygones (qui sont en fait des multi-polygons)
  context.parsePolygone = function(geo) {
    // Vecteur de vecteurs de coordon�es. Chaque vecteur repr�sente un polygone et chaque sous-vecteur contient
    // les coordonn�es n�cessaires pour tracer ce polygone. Le r�sultat permet de tracer une g�om�trie complexe
    // de plusieurs polygones, dans ce cas, les arrondissements
    var polygones = [];
    var stringPolygones = geo.match(/\([^\(\)]+\)/g);
    // Parcours les diff�rents polygones
    for (var i = 0; stringPolygones != null && i < stringPolygones.length; i++){
      var coordonnees = stringPolygones[i].match(/-?\d+\.?\d*/g);
      // Remplit les coordonn�es d'un polygone
      var polygone = [];
      for (var j = 0; coordonnees != null && j < coordonnees.length; j+=2){
        polygone.push(new google.maps.LatLng(Number(coordonnees[j+1]), Number(coordonnees[j])));
      }
      polygones.push(polygone);
    }
    return polygones;
  };


  // Permet de charger les arrondissements dans google maps (� l'aide du xml d�j� charg�)
  context.chargerArrondissements = function() {
    context.arrondissements = [];

    var xml = context.arrondissementsXml;
    if(!xml)
      return;

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
        context.arrondissements.push({
          "nom": arrond[i].getElementsByTagName('Nom')[0].firstChild.nodeValue,
          "polygone": polygone
        });
      }
    }
  };

})(com.dinfogarneau.cours526);