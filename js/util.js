// Raccourci pour la fonction "getElementById".
// Retourne l'objet correspondant à l'identifiant (attribut id) re�u en param�tre.
function $(idElem) {
	return document.getElementById(idElem);
}

// Fonction permettant de voir le code HTML d'un objet DOM re�u en param�tre.
// Utile pour le debogage uniquement.
function voirCode(objDOM) {			
	// Utilisation de la propriété "outerHTML" si elle est disponible (nouveauté HTML5).
	if ( typeof  objDOM.outerHTML  !=  "undefined" )
		alert("Code HTML de l'objet DOM\n" + objDOM.outerHTML);
	else
		// Utilisation de la propri�t� "innerHTML" vu que "outerHTML" n'est pas disponible.
		alert("Code HTML de l'int�rieur de l'objet DOM (EXCLUANT la racine de l'�l�ment)\n" + objDOM.innerHTML);
}

// Permet de charger de manière asynchrone un script
// et d'appeler une fonction de callback apr�s le chargement.
function chargerScriptAsync(urlFichier, callbackFct) {
	var script = document.createElement('script');
	script.src = urlFichier;
	script.async = true;
	// Fonction de callback (optionnel) après le chargement asynchrone du script.
	if (typeof callbackFct == "function") {
		script.addEventListener('load', callbackFct, false);
	}
	document.documentElement.firstChild.appendChild(script);
}

function ajax(url, callback, data) {
  var erreur = false;

  try  {
    var xhr = new XMLHttpRequest();
  } catch (e) {
    throw new Error("La création de la requête xhr a échouée");
  }

  if ( ! erreur )
  {
    xhr.open(typeof data == 'object' ? 'POST' : 'GET', url, false);
    xhr.send(null);

    // Le code de retour d'une requête XHR est 200 (OK) si tout s'est bien déroulé.
    if ( xhr.status != 200 )
      throw new Error("La requête xhr a échouée avec le code " + xhr.status);
    callback(xhr.response);
  }
}

function foreach(tableau, callback) {
  for(var i = 0; i < tableau.length; i++)
    callback(tableau[i]);
}