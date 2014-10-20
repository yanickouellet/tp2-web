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

if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    envoyer_erreur("L'id de la ZAP doit être spécifié et être un nombre");
}

if (!isset($_POST['avis'])) {
    envoyer_erreur("L'avis doit être spécifié");
}

$zapId = $_POST['id'];
$texteAvis = $_POST['avis'];


try {
    $req = "INSERT INTO Avis(avis, idZap) VALUES(:avis, :id)";
    $statement = $connBD->prepare($req);
    $statement->execute(array('id' => $zapId, 'avis' => $texteAvis));
    $statement->setFetchMode(PDO::FETCH_OBJ);
} catch (PDOException $e) {
    envoyer_erreur("Erreur lors de l'insertion des données: " . $e->getMessage());
}

$avis = new StdClass();
$avis->id = $connBD->lastInsertId();
$avis->avis = $texteAvis;
$avis->idZap = $zapId;

$statement->closeCursor();

$connBD = null;

sleep(2);

echo json_encode($avis);