<?php

/*
Pour  les  arrondissements,  la  source  de  données  est  le  fichier  XML  disponible  sur  le  portail  de 
données  ouvertes  de  la  ville  de  Québec  (PDOVQ).   À  partir  de  votre  application  cliente,  les 
données sur les  arrondissements  doivent être extraites en  AJAX  (asynchrone) avec une requête 
GET  au format  XML.  S’il y a erreur le format  doit aussi être  XML pour transmettre le message. 
Vous devrez écrire un script PHP  qui fournit ces données dans un format XML de votre choix;  si 
vous le désirez, vous pouvez conserver le format original  du fichier XML pour les arrondissements 
disponible  à  partir  du  PDOVQ.  Pour  afficher  les  arrondissements  sur  la  carte,  utilisez  des 
polygones dans Google Map.
*/

// Retourne du contenu au format xml en utf-8.
header("Content-type: application/xml; charset=utf-8");

// Permet de désactiver la "Same Origin Policy" pour permettre
// un chargement en AJAX à partir d'un autre domaine.
header("Access-Control-Allow-Origin: *");

// Chargement du fichier XML.
$xml = simplexml_load_file('http://donnees.ville.quebec.qc.ca/Handler.ashx?id=2&f=XML');

// Ré-écriture du fichier XML dans la réponse.
echo $xml->asXML();