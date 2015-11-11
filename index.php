<?php
$session = session_start();
$token = $_SESSION['token'] = md5(uniqid(mt_rand(),1));
require_once('database.php');
$results = get($DB);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>game</title>
	<link rel="stylesheet" href="css/style.css">
	<script>TOKEN = '<?php echo $token; ?>'</script>
</head>
<body>
	<div class="wrapper">
		<div class="menu">
			<div id="timer">Таймер: 0 сек</div>
			<div class="best_result" id="best_result">Лучший результат: нет</div>

			<?php if($results): ?>
			<div class="records">
				<h2>Рекорды</h2>
				<?php 
				echo $results['name'].' - '.$results['result'].' сек<br />';
				?>
			</div>
			<?php endif; ?>	
			<div class="controls">
				<button class="start" onclick="start();">Начать игру</button>
				<button class="reset" onclick="reset();">Сброс</button><button class="resetResult" onclick="resetResult();">Обнулить результат</button>
			</div>
		</div>
		<div id="memory_board"></div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/main.js"></script>
</body>
</html>