function newBoard(){tiles_flipped=0;var a="",b="";memory_array.memory_tile_shuffle();for(var c=0;c<memory_array.length;c++)a+='<div class="card-container" id="tile_'+c+'" onclick="memoryFlipTile(this,\''+memory_array[c]+'\')"><div class="front"></div><div class="back">'+memory_array[c]+"</div></div>",b+='<div class="card-container hover"><div class="front"></div><div class="back">'+memory_array[c]+"</div></div>";document.getElementById("memory_board").innerHTML=b,setTimeout(function(){document.getElementById("memory_board").innerHTML=a,timerStart()},3e3)}function memoryFlipTile(a,b){function c(){var a=document.getElementById(memory_tile_ids[0]),b=document.getElementById(memory_tile_ids[1]);a.className="card-container",b.className="card-container",memory_values=[],memory_tile_ids=[]}var d=a.lastElementChild;console.log(d),"card-container hover"!==a.className&&memory_values.length<2&&(a.className="card-container hover",0==memory_values.length?(memory_values.push(b),memory_tile_ids.push(a.id)):1==memory_values.length&&(memory_values.push(b),memory_tile_ids.push(a.id),memory_values[0]==memory_values[1]?(tiles_flipped+=2,memory_values=[],memory_tile_ids=[],tiles_flipped==memory_array.length&&((void 0==bestResult||bestResult>timer)&&(bestResult=timer,setCookie("result",bestResult,settingsCookie)),document.getElementById("best_result").innerHTML="лучший результат: "+bestResult,alert("Ваш результат "+timer+" сек, нажмине ок, чтобы начать игру сначала"),reset())):setTimeout(c,700)))}function timerStart(){interval=setInterval(function(){timer+=1,timerMenu.innerHTML="Таймер: "+timer+" сек"},1e3)}function start(){0===timer&&newBoard()}function reset(){clearInterval(interval),timerMenu.innerHTML="Таймер: 0 сек",timer=0,memory_values=[],memory_tile_ids=[],title_flipped=0,document.getElementById("memory_board").innerHTML=""}function setCookie(a,b,c){c=c||{};var d=c.expires;if("number"==typeof d&&d){var e=new Date;e.setTime(e.getTime()+1e3*d),d=c.expires=e}d&&d.toUTCString&&(c.expires=d.toUTCString()),b=encodeURIComponent(b);var f=a+"="+b;for(var g in c){f+="; "+g;var h=c[g];h!==!0&&(f+="="+h)}document.cookie=f}function deleteCookie(a){setCookie(a,"",{expires:-1})}function getCookie(a){var b=document.cookie.match(new RegExp("(?:^|; )"+a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return b?decodeURIComponent(b[1]):void 0}function resetResult(){bestResult=0,deleteCookie("result"),document.getElementById("best_result").innerHTML="лучший результат: нет"}var memory_array=["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H","I","I","J","J"],memory_values=[],memory_tile_ids=[],title_flipped=0,bestResult;void 0!==getCookie("result")&&(bestResult=getCookie("result"),document.getElementById("best_result").innerHTML="лучший результат: "+bestResult);var settingsCookie={expires:31536e4};Array.prototype.memory_tile_shuffle=function(){for(var a,b,c=this.length;--c>0;)a=Math.floor(Math.random()*(c+1)),b=this[a],this[a]=this[c],this[c]=b};var timer=0,timerMenu=document.getElementById("timer");timerMenu.innerHTML="Таймер: "+timer+" сек";var interval;