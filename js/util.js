'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};
if (typeof com.dinfogarneau.cours526.util == "undefined") com.dinfogarneau.cours526.util = {};

(function(util){
  // Raccourci pour la fonction "getElementById".
  // Retourne l'objet correspondant à l'identifiant (attribut id) reçu en paramètre.
  util.$ = function(idElem) {
    return document.getElementById(idElem);
  };

  // Permet de charger de manière asynchrone un script
  // et d'appeler une fonction de callback après le chargement.
  util.chargerScriptAsync = function(urlFichier, callbackFct) {
    var script = document.createElement('script');
    script.src = urlFichier;
    script.async = true;
    // Fonction de callback (optionnel) après le chargement asynchrone du script.
    if (typeof callbackFct == 'function') {
      script.addEventListener('load', callbackFct, false);
    }
    document.documentElement.firstChild.appendChild(script);
  };

  util.ajax = function(url, callback, callbackErreur, data, estXml) {
    var xhr = new XMLHttpRequest();
    xhr.open(typeof data == 'object' ? 'POST' : 'GET', url, false);
    xhr.send(typeof data == 'undefined' ? null : data);

    // Le code de retour d'une requête XHR est 200 (OK) si tout s'est bien déroulé.
    if ( xhr.status != 200 )
      callbackErreur(xhr.response, xhr.status);
    else {
      if(xhr.responseXML != null)
        callback(xhr.responseXML.documentElement);
      else
        callback(xhr.response);
    }
  };

  util.foreach = function(tableau, callback) {
    for(var i = 0; i < tableau.length; i++)
      callback(tableau[i]);
  };
})(com.dinfogarneau.cours526.util);
