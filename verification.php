<?php
 
//...
// Votre code
//...
// Connexion à la base de données
//...
 
 
// Récupération des variables nécessaires à l'activation
$pseudo = $_GET['log'];
$cle = $_GET['cle'];
 
// Récupération de la clé correspondant au $pseudo dans la base de données
$stmt = $dbh->prepare("SELECT cle,actif FROM membres WHERE pseudo like :pseudo ");
if($stmt->execute(array(':pseudo' => $pseudo)) && $row = $stmt->fetch())
  {
    $clebdd = $row['cle'];    // Récupération de la clé
    $actif = $row['actif']; // $actif contiendra alors 0 ou 1
  }
 
 
// On teste la valeur de la variable $actif récupérée dans la BDD
if($actif == '1') // Si le compte est déjà actif on prévient
  {
     echo "Votre compte est déjà actif !";
  }
else // Si ce n'est pas le cas on passe aux comparaisons
  {
     if($cle == $clebdd) // On compare nos deux clés    
       {
          // Si elles correspondent on active le compte !    
          echo "Votre compte a bien été activé !";
 
          // La requête qui va passer notre champ actif de 0 à 1
          $stmt = $dbh->prepare("UPDATE membres SET actif = 1 WHERE pseudo like :pseudo ");
          $stmt->bindParam(':pseudo', $pseudo);
          $stmt->execute();
       }
     else // Si les deux clés sont différentes on provoque une erreur...
       {
          echo "Erreur ! Votre compte ne peut être activé...";
       }
  }