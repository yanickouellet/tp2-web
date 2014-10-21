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

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    envoyer_erreur("L'id de la ZAP doit être spécifié et être un nombre");
}

$zapId = $_GET['id'];

try {
    $req = "SELECT * FROM Avis a WHERE  a.idZap = :id ORDER BY a.id DESC LIMIT 3";
    $statement = $connBD->prepare($req);
    $statement->execute(array('id' => $zapId));
    $statement->setFetchMode(PDO::FETCH_OBJ);
} catch (PDOException $e) {
    envoyer_erreur("Erreur lors du retrait des données");
}

$avis = new stdClass();
$avis->avis = [];

while($ligne = $statement->fetch()) {
    $avis->avis[] = $ligne->avis;
}

$statement->closeCursor();

$connBD = null;

echo json_encode($avis);