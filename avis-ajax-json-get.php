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
    $req = "SELECT * FROM ZAP z INNER JOIN Avis a ON a.idZap = z.id WHERE z.id = :id";
    $statement = $connBD->prepare($req);
    $statement->execute(array('id' => $zapId));
    $statement->setFetchMode(PDO::FETCH_OBJ);
} catch (PDOException $e) {
    envoyer_erreur("Erreur lors du retrait des données");
}

$zap = new stdClass();
$ligne = $statement->fetch();
if(!$ligne)
    envoyer_erreur("La zap n'existe pas.", 404);

foreach(["id", "arrondissement", "noCivique", "batiment", "rue", "longitude", "latitude"] as $attribut)
    $zap->$attribut = $ligne->$attribut;
$zap->avis = [];

while($ligne = $statement->fetch()) {
    $zap->avis[] = $ligne->avis;
}

$statement->closeCursor();

$connBD = null;

if (!$zap)
    envoyer_erreur("La zap n'existe pas.", 404);

sleep(2);

echo json_encode($zap);