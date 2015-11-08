var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J'];
var memory_values = [];
var memory_tile_ids = [];
var title_flipped = 0;
var bestResult;

console.log(getCookie('result'));
if(getCookie('result') !== undefined){
	bestResult = getCookie('result');
	document.getElementById('best_result').innerHTML = 'лучший результат: '+ bestResult;
}
var settingsCookie = {
	expires: 3600,
	secure:true,
	domain: "*.googledrive.com"
};

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
	var show = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
		show +=  '<div style="background:#fff">'+memory_array[i]+'</div>';
	}

	document.getElementById('memory_board').innerHTML = show;
	setTimeout(function(){
		document.getElementById('memory_board').innerHTML = output;
		timerStart();
	}, 3000);
	
}

function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					
					if(bestResult == undefined || bestResult > timer){
						bestResult = timer;
						setCookie('result', bestResult, settingsCookie);
					}

					document.getElementById('best_result').innerHTML = 'лучший результат: '+ bestResult;
					alert("Ваш результат " + timer + ' сек, нажмине ок, чтобы начать игру сначала');
					reset();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url("images/texture_2_by_keymoon.jpg") 0 0 no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url("images/texture_2_by_keymoon.jpg") 0 0 no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}


var timer = 0;
var timerMenu = document.getElementById('timer');
timerMenu.innerHTML = 'Таймер: '+ timer + ' сек';
var interval;




function timerStart(){
	interval = setInterval(function(){
		timer +=1;
		timerMenu.innerHTML = 'Таймер: '+ timer + ' сек';
		



	}, 1000);
}

function start(){
	if(timer === 0){
		newBoard();
	}
}

function reset(){
	clearInterval(interval);
	timerMenu.innerHTML = 'Таймер: '+ 0 + ' сек';
	timer = 0;
	memory_values = [];
	memory_tile_ids = [];
	title_flipped = 0;
	document.getElementById('memory_board').innerHTML = '';
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


function resetResult(){
	bestResult = 0;
	deleteCookie('result');
	document.getElementById('best_result').innerHTML = 'лучший результат: нет';
}