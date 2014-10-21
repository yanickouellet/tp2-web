'use strict';

if (typeof com == "undefined") var com = {};
if (typeof com.dinfogarneau == "undefined") com.dinfogarneau = {};
if (typeof com.dinfogarneau.cours526 == "undefined") com.dinfogarneau.cours526 = {};

(function(context, util){
  // Fonction gérant le chargement du menu et les événements y étant associés
  context.chargerMenu = function() {
    util.$('configuration').parentNode.addEventListener('click', function() {
      var config = util.$('panneau-config');
      if (config.style.visibility=="hidden" || config.style.visibility==""){
        config.style.visibility="visible";
      } else {
        config.style.visibility="hidden";
      }
    }, false);

    //Affichage de la liste des Zap gestion du click
    var listeZap = util.$('liste-zap');
    util.foreach(context.zap, function(zap){
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(zap.batiment != null ? zap.batiment : 'Bâtiment inconnu'));
      listeZap.appendChild(li);

      li.addEventListener('click', function(e){
        context.carte.setCenter(zap.repere.position);
        context.afficherInfoWindow(zap);
      }, false);

    });

    //Gestion du "toogle" des trajets du rtc
    var checkboxTrajets = util.$('afficher-trajets-rtc');
    checkboxTrajets.addEventListener('change', function(e){
      context.layerTrajets.setMap(checkboxTrajets.checked ? context.carte : null);
    }, false);


    //Affichage et gestion de la liste des arrondissements
    var listeArrond = util.$('liste-arrond');
    util.foreach(context.arrondissements, function(arrond, i){
      var li = document.createElement('li');
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.id = 'arrond-' + i;
      li.appendChild(input);

      var label = document.createElement('label')
      label.setAttribute('for', 'arrond-'+i);
      label.appendChild(document.createTextNode(arrond.nom));
      li.appendChild(label);

      listeArrond.appendChild(li);

      input.addEventListener('change', function(e){
        arrond.polygone.setMap(input.checked ? context.carte : null);
      }, false);

    });


    //Gestion des boutons afficher / masquer tout
    util.$('afficher-tous-arrond').addEventListener('click', function(){
      var checkboxes = listeArrond.getElementsByTagName('input');
      for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = true;
        context.arrondissements[i].polygone.setMap(context.carte);
      }
    });

    util.$('masquer-tous-arrond').addEventListener('click', function(){
      var checkboxes = listeArrond.getElementsByTagName('input');
      for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
        context.arrondissements[i].polygone.setMap(null);
      }
    });
  };
})(com.dinfogarneau.cours526, com.dinfogarneau.cours526.util);