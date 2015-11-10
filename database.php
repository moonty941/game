<?php 

try{
	$DB = new PDO("mysql:host=localhost;dbname=games","root","Gmx95Stld7");
	$DB->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$DB->exec('SET NAMES utf8');
}
catch(PDOException $e){
	echo $e->getMessage();
}

if(isset($_GET['action']) && function_exists($_GET['action'])){
	$run = $_GET['action'];
	$run($DB);
}

function get($db){
	$STH = $db->query("SELECT * FROM result");
	$results = $STH->fetch(PDO::FETCH_ASSOC);
	return $results;
}

function update($db){
	$STH = $db->prepare("UPDATE result SET name = :name , result = :result");
	$STH->bindParam(':name', $_GET['name'], PDO::PARAM_STR);
	$STH->bindParam(':result', $_GET['result'], PDO::PARAM_INT);
	$STH->execute();
	echo 'ok';
	exit();
}

function set($db){
	$STH = $db->prepare("INSERT INTO result (name, result) VALUES (:name, :result)");
	$STH->bindParam(':name', $_GET['name'], PDO::PARAM_STR);
	$STH->bindParam(':result', $_GET['result'], PDO::PARAM_INT);
	$STH->execute();
	echo 'ok';
	exit();
}

function get_result($db){
	$STH = $db->query("SELECT result FROM result");
	$results = $STH->fetch(PDO::FETCH_ASSOC);
	echo $results['result'];
}


?>