<?php 
if(!isset($session)) session_start();
require_once('settings.php'); 
try{
	$DB = new PDO("mysql:host=".HOST.";dbname=".DBNAME, USER, PASSWORD);
	$DB->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$DB->exec('SET NAMES utf8');
}
catch(PDOException $e){
	echo $e->getMessage('Ошибка подключения');
}

if(isset($_POST['action']) && function_exists($_POST['action']) && $_POST['token'] == $_SESSION['token']){
	$run = $_POST['action'];
	$run($DB);
}

function get($db){
	$STH = $db->query("SELECT * FROM games");
	$results = $STH->fetch(PDO::FETCH_ASSOC);
	return $results;
}

function update($db){
	$STH = $db->prepare("UPDATE games SET name = :name , result = :result");
	$STH->bindParam(':name', $_POST['name'], PDO::PARAM_STR);
	$STH->bindParam(':result', $_POST['result'], PDO::PARAM_INT);
	$STH->execute();
	
	exit();
}

function set($db){
	$STH = $db->prepare("INSERT INTO games (name, result) VALUES (:name, :result)");
	$STH->bindParam(':name', $_POST['name'], PDO::PARAM_STR);
	$STH->bindParam(':result', $_POST['result'], PDO::PARAM_INT);
	$STH->execute();
	echo $_POST['token'].' '.$_SESSION['token'];
	exit();
}

function get_result($db){
	$STH = $db->query("SELECT result FROM games");
	$results = $STH->fetch(PDO::FETCH_ASSOC);
	echo $results['result'];
}


?>