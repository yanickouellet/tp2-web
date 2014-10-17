-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 09 Octobre 2014 à 18:40
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  "web_tp2"
--
CREATE DATABASE IF NOT EXISTS "web_tp2" DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE web_tp2;

-- --------------------------------------------------------

--
-- Structure de la table "avis"
--

CREATE TABLE "avis" (
  "id" int NOT NULL DEFAULT '0',
  "avis" text,
  "idZap" int DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "fk_idZap" ("idZap")
);

--
-- Vider la table avant d'insérer "avis"
--

TRUNCATE TABLE "avis";
--
-- Contenu de la table "avis"
--

SET IDENTITY_INSERT "avis" ON ;
INSERT INTO "avis" VALUES
(1, 'tempor arcu. Vestibulum ut eros non enim commodo hendrerit.', 19),
(2, 'lacus. Mauris non', 43),
(3, 'et, eros. Proin', 42),
(4, 'mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem,', 44),
(5, 'pede et risus. Quisque libero lacus, varius et, euismod et,', 41),
(6, 'luctus ut, pellentesque', 3),
(7, 'convallis', 28),
(8, 'lectus. Cum sociis natoque', 17),
(9, 'non, bibendum sed,', 11),
(10, 'tellus lorem eu', 44),
(11, 'Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse', 15),
(12, 'adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus.', 12),
(13, 'elit elit fermentum risus, at fringilla purus mauris', 13),
(14, 'imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus,', 35),
(15, 'ultrices. Duis volutpat nunc sit amet metus. Aliquam', 21),
(16, 'ipsum dolor sit amet, consectetuer adipiscing', 37),
(17, 'a neque.', 28),
(18, 'tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam', 9),
(19, 'non, luctus sit amet, faucibus', 4),
(20, 'Sed id risus quis', 32),
(21, 'parturient montes, nascetur', 21),
(22, 'convallis convallis dolor. Quisque tincidunt', 15),
(23, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere', 40),
(24, 'ornare. In faucibus. Morbi', 16),
(25, 'Maecenas iaculis', 49),
(26, 'eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut', 6),
(27, 'velit eget laoreet posuere, enim', 18),
(28, 'eget metus. In nec orci. Donec nibh. Quisque', 1),
(29, 'ipsum primis in faucibus orci luctus et ultrices', 22),
(30, 'ullamcorper, nisl arcu iaculis enim, sit amet', 35),
(31, 'vitae nibh. Donec est mauris, rhoncus id,', 30),
(32, 'nec luctus', 37),
(33, 'nec, imperdiet nec, leo. Morbi', 43),
(34, 'Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam', 29),
(35, 'et arcu imperdiet ullamcorper. Duis at', 24),
(36, 'nec', 8),
(37, 'elit fermentum risus, at fringilla purus', 47),
(38, 'In faucibus. Morbi', 33),
(39, 'Quisque ac libero', 44),
(40, 'scelerisque mollis. Phasellus', 4),
(41, 'sem.', 18),
(42, 'mauris. Morbi', 37),
(43, 'ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc', 28),
(44, 'lobortis augue scelerisque', 38),
(45, 'a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla', 32),
(46, 'Nullam velit', 42),
(47, 'arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi.', 39),
(48, 'orci luctus et ultrices posuere cubilia Curae;', 11),
(49, 'ac urna. Ut tincidunt vehicula risus. Nulla eget metus', 32),
(50, 'elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et', 31),
(51, 'Ut tincidunt vehicula risus. Nulla eget', 1),
(52, 'tellus', 15),
(53, 'a tortor. Nunc commodo auctor velit. Aliquam', 44),
(54, 'vehicula. Pellentesque', 33),
(55, 'id,', 7),
(56, 'volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque', 50),
(57, 'Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus', 35),
(58, 'sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh', 20),
(59, 'elit', 48),
(60, 'Phasellus fermentum convallis ligula. Donec', 34),
(61, 'Phasellus vitae mauris sit amet lorem semper', 21),
(62, 'congue turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum', 16),
(63, 'velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas.', 30),
(64, 'magna. Cras convallis convallis dolor. Quisque', 12),
(65, 'nec ante blandit viverra. Donec', 3),
(66, 'augue ac ipsum. Phasellus vitae mauris sit', 18),
(67, 'nisi magna sed dui. Fusce aliquam,', 16),
(68, 'lorem, eget mollis lectus pede et risus. Quisque', 1),
(69, 'dolor.', 26),
(70, 'ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum,', 43),
(71, 'lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet', 6),
(72, 'Aliquam adipiscing lobortis risus. In', 10),
(73, 'ultrices. Vivamus rhoncus. Donec', 18),
(74, 'dui.', 48),
(75, 'dapibus id, blandit', 20),
(76, 'faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ornare. Fusce', 5),
(77, 'lacus. Aliquam', 13),
(78, 'id, erat. Etiam vestibulum massa rutrum magna. Cras', 4),
(79, 'sodales elit', 42),
(80, 'risus. Duis a mi fringilla mi lacinia', 28),
(81, 'vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor', 28),
(82, 'vel, faucibus id, libero. Donec consectetuer mauris id sapien.', 15),
(83, 'arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus.', 27),
(84, 'ipsum. Suspendisse', 25),
(85, 'tellus.', 31),
(86, 'massa. Suspendisse eleifend. Cras sed leo. Cras', 47),
(87, 'placerat, augue. Sed molestie. Sed id risus quis', 6),
(88, 'auctor, velit eget laoreet posuere,', 8),
(89, 'semper tellus id', 3),
(90, 'nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus', 49),
(91, 'tincidunt dui augue eu tellus. Phasellus elit pede, malesuada', 49),
(92, 'tortor at risus. Nunc ac sem ut dolor dapibus', 13),
(93, 'non, egestas', 18),
(94, 'nibh enim, gravida sit amet, dapibus id, blandit at, nisi.', 9),
(95, 'Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies', 25),
(96, 'condimentum. Donec at', 36),
(97, 'velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus', 15),
(98, 'et malesuada fames ac turpis egestas. Aliquam fringilla', 45),
(99, 'Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a', 26),
(100, 'eu, ligula. Aenean euismod mauris', 16),
(101, 'rutrum lorem ac', 11),
(102, 'Donec at arcu. Vestibulum ante ipsum primis in faucibus', 24),
(103, 'quam a felis ullamcorper', 16),
(104, 'urna. Nunc', 49),
(105, 'convallis erat, eget tincidunt dui augue eu tellus.', 8),
(106, 'est ac facilisis facilisis, magna tellus faucibus leo, in', 22),
(107, 'eget massa. Suspendisse eleifend.', 34),
(108, 'lobortis tellus justo sit amet nulla. Donec non', 16),
(109, 'ut aliquam iaculis, lacus pede sagittis', 50),
(110, 'ipsum. Phasellus vitae mauris sit amet', 12),
(111, 'pede nec ante blandit viverra.', 50),
(112, 'viverra. Maecenas iaculis', 32),
(113, 'ipsum leo elementum sem, vitae aliquam eros turpis non enim. Mauris', 1),
(114, 'non enim commodo hendrerit. Donec porttitor tellus non', 45),
(115, 'Quisque fringilla', 22),
(116, 'Pellentesque tincidunt tempus risus. Donec egestas. Duis ac', 14),
(117, 'neque. Morbi quis urna. Nunc quis arcu vel', 4),
(118, 'quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna.', 45),
(119, 'aliquet nec, imperdiet nec,', 46),
(120, 'consectetuer euismod est arcu ac orci. Ut semper', 23),
(121, 'nisi', 10),
(122, 'sem semper erat, in consectetuer ipsum', 22),
(123, 'Proin vel nisl. Quisque fringilla euismod enim.', 29),
(124, 'nec', 18),
(125, 'metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus', 23),
(126, 'id sapien. Cras dolor dolor, tempus', 42),
(127, 'dictum eleifend, nunc risus varius orci, in consequat enim', 41),
(128, 'ut cursus luctus, ipsum leo elementum sem, vitae aliquam eros turpis', 37),
(129, 'Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas.', 45),
(130, 'amet risus. Donec egestas. Aliquam nec', 10),
(131, 'vitae sodales nisi magna sed dui. Fusce aliquam, enim nec tempus', 36),
(132, 'eget lacus. Mauris non dui nec', 14),
(133, 'Quisque ac libero nec ligula consectetuer rhoncus. Nullam', 6),
(134, 'Fusce feugiat. Lorem ipsum dolor', 45),
(135, 'velit. Sed malesuada', 36),
(136, 'Nunc mauris.', 11),
(137, 'velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed', 3),
(138, 'orci. Phasellus', 24),
(139, 'in, tempus eu, ligula. Aenean euismod mauris eu', 45),
(140, 'malesuada vel, convallis in,', 47),
(141, 'eu nibh vulputate mauris sagittis placerat. Cras', 20),
(142, 'mauris. Integer', 32),
(143, 'Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit,', 10),
(144, 'lorem. Donec elementum, lorem ut aliquam iaculis, lacus', 27),
(145, 'litora torquent', 15),
(146, 'consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae,', 28),
(147, 'sit amet ornare lectus justo', 32),
(148, 'ligula. Nullam enim. Sed nulla ante, iaculis', 21),
(149, 'felis. Nulla tempor augue ac ipsum. Phasellus', 43),
(150, 'sapien. Aenean massa. Integer vitae nibh. Donec est mauris,', 49),
(151, 'eu nulla', 20),
(152, 'In at pede. Cras vulputate velit eu sem. Pellentesque', 39),
(153, 'tempor augue ac ipsum. Phasellus vitae', 18),
(154, 'at, egestas a, scelerisque sed, sapien. Nunc', 14),
(155, 'Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum', 39),
(156, 'arcu. Vivamus sit amet risus. Donec', 9),
(157, 'augue,', 2),
(158, 'Sed eu nibh vulputate mauris sagittis', 17),
(159, 'Integer aliquam', 16),
(160, 'luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim.', 40),
(161, 'id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et,', 14),
(162, 'consequat dolor vitae dolor. Donec fringilla.', 43),
(163, 'non dui nec urna', 16),
(164, 'nec', 26),
(165, 'vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus', 48),
(166, 'malesuada id,', 14),
(167, 'posuere cubilia Curae; Phasellus ornare. Fusce', 21),
(168, 'justo. Proin non massa non ante bibendum ullamcorper. Duis', 43),
(169, 'ullamcorper', 15),
(170, 'Duis elementum, dui quis accumsan convallis, ante lectus convallis', 40),
(171, 'Donec dignissim', 37),
(172, 'erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt', 21),
(173, 'Donec non justo. Proin non massa non', 36),
(174, 'ullamcorper.', 16),
(175, 'tempor', 11),
(176, 'pede. Cras vulputate velit eu sem.', 20),
(177, 'lorem fringilla ornare placerat, orci', 41),
(178, 'vitae purus gravida', 31),
(179, 'vel, convallis in, cursus et, eros. Proin', 18),
(180, 'dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus', 16),
(181, 'nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula.', 15),
(182, 'Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus', 26),
(183, 'nec urna suscipit nonummy. Fusce fermentum fermentum arcu. Vestibulum ante', 21),
(184, 'primis in faucibus', 3),
(185, 'Vivamus sit amet risus. Donec egestas.', 17),
(186, 'non arcu. Vivamus sit amet risus.', 50),
(187, 'justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis', 7),
(188, 'non nisi. Aenean', 36),
(189, 'sodales purus, in molestie tortor nibh', 4),
(190, 'nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh', 29),
(191, 'adipiscing, enim mi tempor lorem, eget', 27),
(192, 'Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis', 34),
(193, 'varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est.', 33),
(194, 'lobortis ultrices. Vivamus rhoncus. Donec est. Nunc', 31),
(195, 'Fusce fermentum fermentum arcu. Vestibulum ante', 27),
(196, 'dapibus gravida. Aliquam tincidunt, nunc ac', 30),
(197, 'porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris', 5),
(198, 'adipiscing elit. Etiam laoreet, libero', 14),
(199, 'sagittis placerat.', 14),
(200, 'augue porttitor interdum. Sed auctor odio a purus.', 20);

SET IDENTITY_INSERT "avis" OFF;

-- --------------------------------------------------------

--
-- Structure de la table "zap"
--

CREATE TABLE "zap" (
  "id" int NOT NULL DEFAULT '0',
  "arrondissement" varchar(255) DEFAULT NULL,
  "noCivique" int DEFAULT NULL,
  "batiment" varchar(255) DEFAULT NULL,
  "rue" varchar(255) DEFAULT NULL,
  "longitude" decimal(15,13) DEFAULT NULL,
  "latitude" decimal(15,13) DEFAULT NULL,
  PRIMARY KEY ("id")
);

--
-- Vider la table avant d'insérer "zap"
--

TRUNCATE TABLE "zap";
--
-- Contenu de la table "zap"
--

SET IDENTITY_INSERT "zap" ON ;
INSERT INTO "zap" VALUES
(1, 'Sainte-Foy–Sillery–Cap-Rouge', 999, 'Bibliothèque Monique-Corriveau', 'Avenue Roland-Beaudin', '-71.2974292605533', '46.7725201866417'),
(2, 'Charlesbourg', 7950, 'Bibliothèque de Charlesbourg', '1ière Avenue', '-71.2688581575114', '46.8607994893503'),
(3, 'Sainte-Foy–Sillery–Cap-Rouge', 1445, 'Bibliothèque Charles-H.-Blais', 'Avenue Maguire', '-71.2504526901053', '46.7794770320922'),
(4, 'Charlesbourg', 750, 'Aréna Arpidrome de Charlesbourg', 'Rue de la Sorbonne', '-71.2570526143807', '46.8644227315423'),
(5, 'Sainte-Foy–Sillery–Cap-Rouge', 3020, 'Piscine Sylvie Bernier', 'Boulevard Hochelaga', '-71.2982933382791', '46.7671409607745'),
(6, 'Sainte-Foy–Sillery–Cap-Rouge', 930, 'Centre sportif Ste-Foy', 'Avenue Roland-Beaudin', '-71.2998555542304', '46.7708029652948'),
(7, 'Sainte-Foy–Sillery–Cap-Rouge', 3300, 'Bureau Information Touristique Sainte-Foy', 'Avenue des Hôtels', '-71.2939134698117', '46.7570322033550'),
(8, 'Sainte-Foy–Sillery–Cap-Rouge', 4705, 'Bibliothèque Roger-Lemelin', 'Rue de la Promenade-des-Soeurs', '-71.3618219035727', '46.7468001923708'),
(9, 'Laurentien', 3490, 'Centre Culturel Georges-D''Or', 'Route de l''Aéroport', '-71.4354003280748', '46.8433850490281'),
(10, 'Laurentien', 1465, 'Bibliothèque Félix-Leclerc', 'Rue de l''Innovation', '-71.4196696735345', '46.8574560404068'),
(11, 'Beauport', 3515, 'Bibliothèque Étienne-Parent', 'Rue Clémenceau', '-71.2109387969343', '46.8656900274863'),
(12, 'Beauport', 3095, 'Bibliothèque du Chemin-Royal', 'Chemin Royal', '-71.2118573519063', '46.8498417771503'),
(13, 'La Haute-Saint-Charles', 530, 'Bibliothèque Le Tournesol', 'Rue Delage', '-71.3769232972219', '46.9074610774413'),
(14, 'Charlesbourg', 4215, 'Point de service du Jardin', 'Avenue des Sauges', '-71.2835926912420', '46.8810222609387'),
(15, 'Sainte-Foy–Sillery–Cap-Rouge', 1465, 'Point de service Champigny', 'Rue Félix-Antoine-Savard', '-71.3691551701141', '46.7739141730803'),
(16, 'Charlesbourg', 425, 'Point de service Bon-Pasteur', 'Rue du Bienheureux Jean-XXIII', '-71.3088022527788', '46.9007813559042'),
(17, 'La Haute-Saint-Charles', 262, 'Bibliothèque Chrystine-Brouillet', 'Rue Racine', '-71.3599159380575', '46.8526544007960'),
(18, 'Sainte-Foy–Sillery–Cap-Rouge', 835, 'Maison de la découverte', 'avenue Wilfrid-Laurier', '-71.2128378567593', '46.8069859250506'),
(19, 'La Cité-Limoilou', NULL, 'Place d''Youville', NULL, '-71.2138189332176', '46.8123460686530'),
(20, 'Sainte-Foy–Sillery–Cap-Rouge', 939, 'Marché de Sainte-Foy', 'Avenue Roland-Beaudin', '-71.2985784995983', '46.7723142505241'),
(21, 'Sainte-Foy–Sillery–Cap-Rouge', NULL, 'Avenue Roland-Beaudin', NULL, '-71.3004900370354', '46.7709532504456'),
(22, 'La Cité-Limoilou', 995, 'Palais Montcalm', 'Place D''Youville', '-71.2133755162613', '46.8119755814748'),
(23, 'La Cité-Limoilou', 2, 'Parc de l''Hôtel-de-ville', 'Rue des Jardins', '-71.2081882825200', '46.8133824005138'),
(24, 'Les Rivières', 3050, 'Aréna de Duberger', 'Boulevard Central', '-71.2934911366123', '46.8164052109917'),
(25, 'Les Rivières', 2650, 'Aréna Gaétan Duchesne', 'Avenue D''Alembert', '-71.3250065073712', '46.8094440632742'),
(26, 'Les Rivières', 220, 'Aréna Patrick Poulin', 'Avenue du Chanoine-Côté', '-71.2554885005226', '46.8155558104143'),
(27, 'Les Rivières', 3705, 'Aréna Centre communautaire Michel-Labadie', 'Avenue Chauveau', '-71.3466698207840', '46.8326462966819'),
(28, 'Beauport', 655, 'Centre sportif Marcel-Bédard', 'Boulevard des Chutes', '-71.1897557110783', '46.8575340165756'),
(29, 'Beauport', 3500, 'Aréna de Giffard', 'Rue Cambronne', '-71.2091251161446', '46.8617455852799'),
(30, 'Beauport', 1011, 'Aréna Gilles Tremblay', 'Avenue Larue', '-71.1725620133700', '46.8890154384577'),
(31, 'La Cité-Limoilou', 2280, 'Aréna Bardy', 'Avenue Monseigneur-Gosselin', '-71.2229671298303', '46.8441099145131'),
(32, 'La Haute-Saint-Charles', 86, 'Pavillon des sports de Loretteville', 'Boulevard des Étudiants', '-71.3623450472425', '46.8566427799184'),
(33, 'Sainte-Foy–Sillery–Cap-Rouge', 3200, 'Centre communautaire Claude-Allard', 'Avenue D''Amours', '-71.3193856582649', '46.7748072901034'),
(34, 'La Cité-Limoilou', 100, 'Centre Lucien-Borne', 'Chemin Sainte-foy', '-71.2289570755839', '46.8061064575493'),
(35, 'Beauport', 2, 'Centre du Fargy', 'Rue Fargy', '-71.1897858974760', '46.8583857511017'),
(36, 'La Cité-Limoilou', 680, 'Centre récréatif Mgr-Bouffard', 'Raoul-Jobin', '-71.2440088145048', '46.8079480772527'),
(37, 'La Cité-Limoilou', 2000, 'Domaine Maizeret', 'Boulevard Montmorency', '-71.2138462370466', '46.8356747220108'),
(38, 'La Cité-Limoilou', 230, 'Centre St-Roch', 'Rue du Pont', '-71.2234946101919', '46.8178911969909'),
(39, 'Sainte-Foy–Sillery–Cap-Rouge', 1229, 'Centre communautaire Noël-Brûlart', 'Avenue du Chanoine-Morel', '-71.2495907542743', '46.7853216136440'),
(40, 'Les Rivières', 2920, 'Centre Jos-A-Lachance', 'Rue Claisse', '-71.3141695088156', '46.8163409501900'),
(41, 'Les Rivières', 1650, 'Comptoir Lebourgneuf', 'Boulevard de la Morille', '-71.3074328789583', '46.8422753604456'),
(42, 'Les Rivières', 4075, 'Centre communautaire Jean-Baptiste-Lafrance', 'Rue Maria-Goretti', '-71.3112969953741', '46.8022279708926'),
(43, 'Beauport', 95, 'Camping de Beauport', 'Rue de la Sérénité', '-71.1781558553646', '46.8969323901680'),
(44, 'La Haute-Saint-Charles', 3490, 'Centre Culturel Georges-Dor', 'Route de l''Aéroport', '-71.4353705011391', '46.8433662474320'),
(45, 'La Haute-Saint-Charles', 305, 'Centre Communautaire Loretteville', 'Rue Racine', '-71.3597154052160', '46.8505335573303'),
(46, 'Sainte-Foy–Sillery–Cap-Rouge', 4155, 'Parc Nautique Cap-Rouge', 'Chemin de la Plage-Jacques-Cartier', '-71.3416735285597', '46.7470407180138'),
(47, 'Sainte-Foy–Sillery–Cap-Rouge', 3206, 'Base de Plein air de Sainte-Foy (Maison Laberge)', 'Rue Laberge', '-71.3329936192543', '46.7878083923185'),
(48, 'La Cité-Limoilou', 100, 'Stade Municipal', 'Rue du Cardinal-Maurice-Roy', '-71.2338419326230', '46.8187127892843'),
(49, 'Sainte-Foy–Sillery–Cap-Rouge', 3643, 'Piscine Jacques-Amyot', 'Avenue des Compagnons', '-71.3288805019998', '46.7592586298375'),
(50, 'St-Roch sans fil', NULL, NULL, NULL, '-71.2251713585348', '46.8142211653793'),
(51, '295', NULL, 'Boulevard Charest Est', NULL, '-71.2260585563660', '46.8129039911246'),
(52, 'La Haute-Saint-Charles', 530, 'Centre communautaire Paul-Émile-Beaulieu', 'Rue Delage', '-71.3767223138397', '46.9072769516470'),
(53, 'Les Rivières', 2455, 'Centre Elzéar-Turcotte', 'Boulevard Central', '-71.2936314427322', '46.8107994736956'),
(54, 'Sainte-Foy–Sillery–Cap-Rouge', 4473, 'Centre communautaire Cap-rouge', 'rue Saint-Félix', '-71.3541932167543', '46.7410996132182');

SET IDENTITY_INSERT "zap" OFF;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table "avis"
--
ALTER TABLE "avis"
  ADD CONSTRAINT "fk_idZap" FOREIGN KEY ("idZap") REFERENCES "zap" ("id");

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;