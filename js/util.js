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

  util.ajax = function(url, callback, callbackErreur, data) {
    if(typeof data == 'undefined')
      data = null;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if(xhr.readyState != 4) return;
      if ( xhr.status != 200 )
        callbackErreur(xhr.response, xhr.status);
      else {
        if(xhr.responseXML != null)
          callback(xhr.responseXML.documentElement);
        else
          callback(xhr.response);
      }
    };

    xhr.open(data != null ? 'POST' : 'GET', url, true);
    if(data != null) {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      var uri = '';
      for(var cle in data)
        uri += cle + '=' + encodeURIComponent(data[cle]) + '&';
      xhr.send(uri);
    } else
      xhr.send(null);
  };

  util.foreach = function(tableau, callback) {
    for(var i = 0; i < tableau.length; i++)
      callback(tableau[i]);
  };
})(com.dinfogarneau.cours526.util);
