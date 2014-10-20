<?php

header("Content-type: application/xml; charset=utf-8");

echo file_get_contents('http://donnees.ville.quebec.qc.ca/Handler.ashx?id=2&f=XML');

