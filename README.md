# Prelium – Assistance Odoo (userscript)

Présélectionne automatiquement le contrat client sur le formulaire de ticket d'assistance odoo.com ([help-form](https://www.odoo.com/fr_FR/help-form)), à partir du bouton **Assistance Odoo** de notre instance Odoo (module `prelium_odoo_helpdesk`).

## Pourquoi

En tant que partenaire, le formulaire odoo.com affiche la liste de tous nos contrats clients. Retrouver le bon devient long à mesure que le portefeuille grandit, et le formulaire ne permet pas de présélectionner un contrat via l'URL. Ce script le fait à notre place.

## Installation

À faire une seule fois par navigateur.

1. Installer l'extension **Tampermonkey** : [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) · [Firefox](https://addons.mozilla.org/fr/firefox/addon/tampermonkey/) · [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
2. **Chrome uniquement** : ouvrir `chrome://extensions` → Tampermonkey → *Détails* → activer **Autoriser les scripts utilisateur**.
3. Ouvrir le lien suivant : Tampermonkey l'intercepte et affiche sa page d'installation, cliquer alors sur **Installer**.
   **https://raw.githubusercontent.com/ORG/REPO/main/prelium-assistance.user.js**

   > Depuis la page du fichier sur GitHub, cliquer sur le bouton **Raw**.
   > Si le code s'affiche en texte brut au lieu de la page Tampermonkey, l'extension n'est pas active (revoir les étapes 1 et 2).

Les mises à jour du script sont ensuite récupérées automatiquement par Tampermonkey.

## Utilisation

1. Être connecté à odoo.com avec le **compte partenaire Prelium**.
2. Dans notre Odoo, cliquer sur **Assistance Odoo** depuis une fiche société ou un ticket Helpdesk.
3. Le formulaire odoo.com s'ouvre avec le contrat du client déjà sélectionné.

Une alerte s'affiche si le code d'abonnement de la fiche n'existe pas dans la liste partenaire (code erroné ou client non rattaché à notre compte).

## Fonctionnement

Le bouton Odoo ouvre `https://www.odoo.com/fr_FR/help-form#contract_number=<code>`. Le script :

- ne s'exécute que sur les pages `help-form` d'odoo.com, et ne fait rien sans `#contract_number` dans l'URL ;
- coche « M'identifier grâce à : code d'abonnement » (`edition=enterprise`) ;
- sélectionne le contrat dans la liste `contract_number`.

Le script ne fait aucune requête réseau, ne lit aucune donnée et n'utilise aucune API privilégiée (`@grant none`).

## Dépannage

| Symptôme | Cause probable |
|---|---|
| Rien n'est sélectionné | Script non installé/désactivé, ou option *Autoriser les scripts utilisateur* désactivée (Chrome) |
| Le premier contrat de la liste reste sélectionné | Ouverture du formulaire sans passer par le bouton Odoo (pas de `#contract_number` dans l'URL) |
| Alerte « Contrat absent de la liste partenaire » | Code d'abonnement erroné sur la fiche société, ou non connecté avec le compte partenaire |
| Ne fonctionne plus du jour au lendemain | Odoo a modifié son formulaire : vérifier les champs `edition` et `contract_number` (F12) et mettre à jour le script |

## Maintenance

Après modification de `prelium-assistance.user.js`, **incrémenter `@version`** dans l'en-tête, sinon Tampermonkey ne propose pas la mise à jour aux utilisateurs.
