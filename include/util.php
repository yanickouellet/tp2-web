<?php

function envoyer_erreur($message, $statut = 500)
{
    http_response_code($statut);
    $erreur = new stdClass();
    $erreur->message = $message;
    $erreur->statut = $statut;
    exit(json_encode($erreur));
}