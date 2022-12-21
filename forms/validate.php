<?php 

   $pdo = new PDO('mysql:host=localhost;dbname=php_ajax', 'root', 'root',
   [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
   PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']
    );

// var_dump($pdo);

$content = 0;
$error = "";

if(isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['email']) && isset($_POST['mdp'])){

    // print_r($_POST);

    $nom = htmlspecialchars(addslashes(trim($_POST['nom'])));
    $prenom = htmlspecialchars(addslashes(trim($_POST['prenom'])));
    $email = htmlspecialchars(addslashes(trim($_POST['email'])));
    $mdp = htmlspecialchars(addslashes(trim($_POST['mdp'])));

    if(!empty($nom) && !empty($prenom)  && !empty($email) && !empty($mdp)){

        if(!filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            $error.= "veuillez saisir un mail valide";

        }

        if(strlen($nom) <3 || strlen($nom) >25 )
        {
            $error.= "veuillez saisir un nom entre 3 et 25 caractères";
        }

        if(strlen($prenom) <3 || strlen($prenom) >25 )
        {
            $error.= "veuillez saisir un prenom entre 3 et 25 caractères";
        }

        if(empty($error))
        {
            $mdp = password_hash($mdp, PASSWORD_DEFAULT);

            $req = "INSERT INTO user (nom, prenom, mail, hash) VALUES (:nom, :prenom, :email, :hash)";
            $stmt = $pdo->prepare($req);
            $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
            $stmt->bindValue(':prenom', $prenom, PDO::PARAM_STR);
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $stmt->bindValue(':hash', $mdp, PDO::PARAM_STR);
            $stmt->execute();
            
            if($stmt->rowCount() > 0)
            {
                $content = 1;
            }else{
                $error.= "Erreur lors de l'inscription";
            }
        }

    }else{

        $error.= "veuillez remplir tous les champs";

    }

}

$data = ['content' => $content, 'error' => $error]; // Crétaion d'un tableau associatif $ data contenant les données envoyées au fichier JS
echo json_encode($data); // convertit le tableau $data en JSON

?>