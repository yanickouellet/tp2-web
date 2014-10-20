<?php
require("include/param-bd.inc");
try {
	$connBD = new PDO("mysql:host=$dbHote; dbname=$dbNom", $dbUtilisateur, $dbMotPasse, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	$connBD -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
} catch (PDOException $e) {
	exit( "Erreur lors de la connexion à la BD :<br />\n" .  $e->getMessage() );
}

$req[] = 'CREATE TABLE IF NOT EXISTS ZAP (
            id int(11) NOT NULL AUTO_INCREMENT,
            arrondissement VARCHAR(255),
            noCivique int,
            batiment VARCHAR(255),
            rue VARCHAR(255),
            longitude DECIMAL(15,13),
            latitude DECIMAL(15,13),
            PRIMARY KEY (id)
          ) ENGINE=InnoDB';

$req[] = 'CREATE TABLE IF NOT EXISTS Avis (
            id int(11) NOT NULL AUTO_INCREMENT,
            avis TEXT,
            idZap int,
            CONSTRAINT pk_id PRIMARY KEY (id),
            CONSTRAINT fk_idZap FOREIGN KEY (idZap) REFERENCES ZAP(id)
          )';


$req[] = 'ALTER TABLE Avis DROP FOREIGN KEY fk_idZap';
$req[] = 'DELETE FROM ZAP';

foreach ($req as $value) {
	try {
		$reqProf = $value;
		$prepReqProf = $connBD -> prepare($reqProf);
		$prepReqProf -> execute();
	} catch (PDOException $e) {
		exit( "Erreur lors de l'exécution de la requête SQL :<br />\n" .  $e -> getMessage() . "<br />\nREQUÊTE = " . $reqProf );
	}
}

$reqInsertZap = "INSERT INTO ZAP VALUES (:id, :arrond, :noCivique, :batiment, :rue, :longitude, :latitude)";
$prepReqInsertZap = $connBD -> prepare($reqInsertZap);

// Chargement du fichier XML.
$xml = simplexml_load_file('http://donnees.ville.quebec.qc.ca/Handler.ashx?id=29&f=KML');

$i = 1;
foreach($xml->Document->Folder->Placemark as $child)
{
    if (isset($child->Point)){
        $childInfo = $child->ExtendedData->SchemaData->SimpleData;
        $childCoord = explode(',',$child->Point->coordinates);
        $noCivique = null;
        if ($childInfo[1] == 0){
            $noCivique = null;
        }else{
            $noCivique = $childInfo[1];
        }

        try {
            $prepReqInsertZap -> execute( array( "id" => $i,
                "arrond" => $childInfo[0],
                "noCivique" => $noCivique,
                "batiment" => $childInfo[2],
                "rue" => $childInfo[3],
                "longitude" => $childCoord[0],
                "latitude" => $childCoord[1]));
            $i += 1;
        } catch (PDOException $e) {
            exit( "Erreur lors de l'exécution de la requête SQL :<br />\n" .  $e -> getMessage() . "<br />\nREQUÊTE = " . $reqProf );
        }
    }
}

try {
    $reqProf = 'ALTER TABLE Avis ADD CONSTRAINT fk_idZap FOREIGN KEY (idZap) REFERENCES ZAP(id)';
    $prepReqProf = $connBD -> prepare($reqProf);
    $prepReqProf -> execute();
} catch (PDOException $e) {
    exit( "Erreur lors de l'exécution de la requête SQL :<br />\n" .  $e -> getMessage() . "<br />\nREQUÊTE = " . $reqProf );
}