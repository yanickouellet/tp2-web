<?php

/*
Les avis sur les ZAP ne doivent pas être transmises  à ce moment mais seulement  lorsque  le 
repère associé à une ZAP sur la carte sera cliqué.
S’il y a erreur  (connexion à la BD, requête SQL, etc.),  le format  doit aussi être  JSON pour 
transmettre le message d’erreur.
Lorsqu’un repère ZAP est cliqué  sur la carte,  les avis  concernant seulement  cette ZAP  doivent 
être  extraits  en  AJAX  (asynchrone)  avec  une  requête  GET  au  format  JSON.  De  plus,  ces  avis 
doivent être conservés pour éviter de refaire la même requête si le repère est cliqué à nouveau.
*/

// Retourne du contenu en format JSON.
header("Content-type: application/json; charset=utf-8");

// Force l'expiration immédiate de la page au niveau du navigateur Web; elle n'est pas conservée en cache.
header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
header("Pragma: no-cache");






// EXEMPLE

// Message d'erreur.
$msgErreur = null;
// Est-ce que le paramètre "surnom" a été fourni ?
if ( ! isset($_POST["surnom"]) )
	$msgErreur = "Le paramètre \"surnom\" n'a pas été fourni avec la requête.";
else
{
	// Paramètres de connexion à la BD.
	require("include/param-bd.inc");
	// Création d'une connexion à la BD.
	try {
		$connBD = new PDO("mysql:host=$dbHote; dbname=$dbNom", $dbUtilisateur, $dbMotPasse, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		// Pour lancer les exceptions lorsqu'il y des erreurs PDO.
		$connBD -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	} catch (PDOException $e) {
		exit( "Erreur lors de la connexion à la BD :<br />\n" .  $e->postMessage() );
	}

	// Surnom du professeur.
	$surnomProf = $_POST["surnom"];

	try {
		// Préparation et exécution de la requête SQL permettant d'obtenir l'information sur le professeur.
		$reqProf = "SELECT * FROM professeurs WHERE ProfSurnom=:surnomProf";
		$prepReqProf = $connBD -> prepare($reqProf);
		$prepReqProf -> execute( array( "surnomProf" => $surnomProf) );
		// Retourne chaque ligne de données dans un objet (sans classe).
		$prepReqProf -> setFetchMode(PDO::FETCH_OBJ);
	} catch (PDOException $e) {
		exit( "Erreur lors de l'exécution de la requête SQL :<br />\n" .  $e -> postMessage() . "<br />\nREQUÊTE = " . $reqProf );
	}

	// Est-ce que le surnom du professeur est valide ?
	if ( !( $infoProf = $prepReqProf -> fetch() ) )
		$msgErreur = "Le surnom du professeur n'existe pas.";
	else
	{
		// Récupération des informations sur le professeur.
		$profPrenom = $infoProf -> ProfPrenom;
		$profNom = $infoProf -> ProfNom;
		$profTel = $infoProf -> ProfTelephone;
		$profBureau = $infoProf -> ProfBureau;
		$profCourriel = $infoProf -> ProfCourriel;
		
		// Production de l'expression JSON à retourner.
		echo "{\n";
			echo "\t\"prenom\": \"$profPrenom\",\n";
			echo "\t\"nom\": \"$profNom\",\n";
			echo "\t\"telephone\": \"$profTel\",\n";
			echo "\t\"bureau\": \"$profBureau\",\n";
			echo "\t\"courriel\": \"$profCourriel\"\n";
		echo "}\n";	
	}
	// Libération du jeu de résultats.
	$prepReqProf -> closeCursor();
	// Fermeture de la connexion à la BD.
	$connBD = null;
}

// S'il y erreur, on retourne un message d'erreur en format JSON.
if ( $msgErreur != null )
{
		echo "{\n";
		echo "\t\"erreur\":\n";
		echo "\t{\n";
			echo "\t\t\"message\": \"" . str_replace("\"", "\\\"", $msgErreur) . "\"\n";
		echo "\t}\n";
		echo "}\n";
}

// Simulation d'un délai avant de fournir la réponse;
// ceci permet de voir la zone indiquant le chargement AJAX et de réaliser que la requête HTTP est asynchrone.
sleep(2);
?>