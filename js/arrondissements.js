'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){

util.ajax ('proxy-arrondissements.php', function(details) {
	var xml = details;
	var arrond = xml.getElementsByTagName('Arrondissement');
	for (var i = 0;i < arrond.length; i++) {
		var geo;
		for (var j = 0;j < arrond[i].childNodes.length; j++) {
			geo += arrond[i].childNodes[j].nodeValue;
		}
		var poly = parsePolyStrings(geo);
		if (poly.length) {
			context.arrondissement[i] = new google.maps.Polygon({
				paths : poly,
				strokeColor : '#FF0000',
				strokeOpacity : 0.8,
				strokeWeight : 2,
				fillColor : '#FF0000',
				fillOpacity : 0.35
			});
		}
	}
});
		  
context.parsePolygone = function(geo) {
	var coordsGoogle = [];
	var polygones = geo.match(/\([^\(\)]+\)/g);
	if (polygones !== null){
		for (var i = 0; i < polygones.length; i++){
			coordonnees = polygones[i].match(/-?\d+\.?\d*/g);
			if (coordonnees !== null){
				for (var j = 0; j < coordonnees.length; j+=2){
					array.push(new google.maps.LatLng(Number(coordonnees[j]), Number(coordonnees[j+1])));
				}
			}
		}
	}
	return coordsGoogle;
};

})(com.dinfogarneau.cours526, com.dinfogarneau.cours526.util);