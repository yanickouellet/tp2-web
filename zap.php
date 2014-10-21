<?php

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

echo json_encode($zap);