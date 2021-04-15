	window.onload = function(){
		document.body.onmousemove = function(event){
			drag(event);
			resize(event);
		}
	
		var backgrounds = document.getElementsByClassName("background");
		nbbackground = backgrounds.length;
		var top = 50;
		var left = 50;
		var one;
		var containter;
		for(i=0;i<backgrounds.length;i++){ // parcours de toutes les div background de la page.
			one = backgrounds[i];
			one.style.top = top + 15*i;
			one.style.left = left + 15*i;
			one.style.zIndex = i+1;
			
			one.onmousedown = function(event){ // mise en place des événement
				comeForward(this);
				startResize(this, event);
				};
			one.onmousemove = function(event){
				changeCursor(event, this);
				resize(event);
			};
			one.onmouseup = function(){ stopResize(); };
			
			containter = one.getElementsByClassName("containter")[0];
			containter.ondblclick = function(){ minmax(this.parentNode.parentNode); };
			containter.onmousedown = function(event){ startDrag(event, this.parentNode.parentNode); };
			containter.onmousemove = function(event){ drag(event); };
			containter.onmouseup = stopDrag;
			
			// création des boutons
			(containter.getElementsByClassName("fermer")[0]).onclick = function(){ fermer(this.parentNode.parentNode.parentNode); };
			(containter.getElementsByClassName("fermer")[0]).innerHTML = "X";
			(containter.getElementsByClassName("reduire")[0]).onclick = function(){ reduire(this.parentNode.parentNode.parentNode); };
			(containter.getElementsByClassName("reduire")[0]).innerHTML = "_";
			(containter.getElementsByClassName("minmax")[0]).onclick = function(){ minmax(this.parentNode.parentNode.parentNode); };
			(containter.getElementsByClassName("minmax")[0]).innerHTML = "[]";
			
		}
	}
	
	// variables globales pour le drag
	var dragged = false;
	var background;
	var sourisX;
	var sourisY;
	var backgroundX;
	var backgroundY;
	var cole = 15;
	var nbbackground;

	function startDrag(ev, div){
		background = div;
		if(!div.classList.contains("reduit")){
			dragged = true;
			background.style.MozTransitionDuration = "0s";
			background.style.WebkitTransitionDuration = "0s";
			sourisX = ev.clientX;
			sourisY = ev.clientY;
			backgroundX = background.offsetLeft;
			backgroundY = background.offsetTop;
		}
		ev.preventDefault();
	}
	
	function drag(ev){
		if(dragged){
			moveTo(ev.clientX - sourisX + backgroundX, ev.clientY - sourisY + backgroundY);
		}
	}
	
	function moveTo(moveX, moveY){
		
		if(moveY > document.height - background.clientHeight - cole - 10){
			background.style.top = document.height - background.clientHeight - 10 + "px";
		}
		else if(moveY < cole){
			background.style.top = "0px";
		}
		else{
			background.style.top = moveY + "px";
		}
		
		if(moveX > document.width - background.clientWidth - cole - 10){
			background.style.left = document.width - background.clientWidth - 10 + "px";
		}
		else if(moveX < cole){
			background.style.left = "0px";
		}
		else{
			background.style.left = moveX + "px";
		}
	}
	
	function stopDrag(){
		background.style.MozTransitionDuration = "0.2s";
		background.style.WebkitTransitionDuration = "0.2s";
		dragged = false;
	}
	
	// variables globales pour le resize
	var resized = false;
	var direction = "";
	var backgroundHeight;
	var backgroundWidth;
	var minSizeHeight = 25;
	
	function changeCursor(ev, div){
		if(!resized){
			var curso = "";
			var bord = 5;
			
			if(ev.clientY < div.offsetTop+bord) curso += "n";
			if(ev.clientY > div.offsetTop+div.offsetHeight-bord) curso += "s";
			if(ev.clientX > div.offsetLeft+div.offsetWidth-bord) curso += "e";
			if(ev.clientX < div.offsetLeft+bord) curso += "w";
			
			direction = curso;
			
			if(curso == "") curso = "auto";
			else curso += "-resize";
			div.style.cursor = curso;
			document.body.cursor = curso;
		}
	}
	
	function startResize(div, ev){
		if(!dragged){
			background = div;
			if(!div.classList.contains("reduit")){
				resized = true;
				background.style.MozTransitionDuration = "0s";
				background.style.WebkitTransitionDuration = "0s";
				backgroundX = background.offsetLeft;
				backgroundY = background.offsetTop;
				backgroundWidth = background.clientWidth;
				backgroundHeight = background.clientHeight;
				sourisX = ev.clientX;
				sourisY = ev.clientY;
			}
		}
		ev.preventDefault();
	}
	
	var maxResizeX;
	var maxResizeY;
	
	function resize(ev){
		if(resized){
			background.classList.remove("max");
			var minSizeWidth = background.getElementsByClassName("titre")[0].clientWidth + 5;
			var resizeX = ev.clientX - sourisX;
			var resizeY = ev.clientY - sourisY; // différence entre le depart et l'arrivé
			
			var modif;
			var x = backgroundX;
			var y = backgroundY;
			var haveToMove = false;
			if(direction.indexOf("n") != -1){
				modif = backgroundHeight - resizeY;
				if(modif > minSizeHeight){ // si on est supérieur à la taille mini
					background.style.height = modif + "px";
					haveToMove = true;
					y += resizeY;
					maxResizeY = resizeY;
				}
				else{
					y += maxResizeY
				}
			}
			if(direction.indexOf("s") != -1){
				modif = backgroundHeight + resizeY;
				if(modif > minSizeHeight) background.style.height = modif + "px";
			}
			if(direction.indexOf("w") != -1){
				modif = backgroundWidth - resizeX;
				if(modif > minSizeWidth){
					background.style.width = modif + "px";
					haveToMove = true;
					x += resizeX;
					maxResizeX = resizeX;
				}
				else{
					x += maxResizeX;
				}
			}
			if(direction.indexOf("e") != -1){
				modif = backgroundWidth + resizeX;
				if(modif > minSizeWidth) background.style.width = modif + "px";
			}
			
			if(haveToMove) moveTo(x, y);
		}
	}
	
	function stopResize(){
		background.style.MozTransitionDuration = "0.2s";
		background.style.WebkitTransitionDuration = "0.2s";
		resized = false;
	}
	
	function fermer(div){
		div.style.width = div.offsetWidth + 100;
		div.style.height = div.offsetHeight + 100;
		div.style.top = div.offsetTop - 50;
		div.style.left = div.offsetLeft - 50;
		div.classList.add("apu");
		div.classList.remove("reduit");
		div.classList.remove("max");
	}
	
	function minmax(div){
		div.classList.toggle("max");
		div.classList.remove("reduit");
	}
	
	function reduire(div){
		div.classList.toggle("reduit");
		div.classList.remove("max");
	}
	
	// met la background en premier plan
	function comeForward(div){
		var index = div.style.zIndex;
		var backgrounds = document.getElementsByClassName("background");
		for(i=0;i<backgrounds.length;i++){
			if(backgrounds[i].style.zIndex > index){
				backgrounds[i].style.zIndex -= 1;
			}
		}
		div.style.zIndex = nbbackground;
	}