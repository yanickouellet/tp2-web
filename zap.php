<?php

/*
Vous  devez  écrire  un  script  PHP  qui  fournit  les  données  dans  un  format  JSON  de  votre 
choix à partir de la base de données que vous avez construite. 
Les avis sur les ZAP ne doivent pas être transmises  à ce moment mais seulement  lorsque  le 
repère associé à une ZAP sur la carte sera cliqué.
S’il y a erreur  (connexion à la BD, requête SQL, etc.),  le format  doit aussi être  JSON pour 
transmettre le message d’erreur.
*/

require("include/util.php");

header("Content-type: application/json; charset=utf-8");

header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
header("Pragma: no-cache");


require("include/param-bd.inc");
try {
    $connBD = new PDO("mysql:host=$dbHote; dbname=$dbNom", $dbUtilisateur, $dbMotPasse, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $connBD -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
} catch (PDOException $e) {
    envoyer_erreur("Erreur de connexion à la base de donnée.");
}

try {
    $req = "SELECT * FROM ZAP";
    $statement = $connBD->query($req);
    $statement -> setFetchMode(PDO::FETCH_OBJ);
} catch (PDOException $e) {
    envoyer_erreur("Erreur lors du retrait des données");
}

$zap = [];
while($ligne = $statement->fetch()) {
    $zap[] = $ligne;
}

$statement->closeCursor();

$connBD = null;

sleep(2);

echo json_encode($zap);