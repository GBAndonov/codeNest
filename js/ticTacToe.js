
		function startGame(){

			for (var i = 1; i<=9; i = i + 1){
				clearbox(i); 
			} 

			document.turn = "X";
			if (Math.random() < 0.5){
				document.turn = "O";
			}
			document.winner = null;
			setMessage(document.turn + " gets to start");
			document.getElementById("message").style.backgroundColor = "#1dead5";
			document.getElementById("reset-game").style.display = "none";
			document.getElementById("message").style.fontSize = "20px";

			if(document.getElementById("computerPlay").checked && document.turn == "O"){
				computerMove();
			}
		}

		function setMessage(msg){
			document.getElementById("message").innerText = msg;
		}

		function nextMove(square){ 
			if(document.winner != null){
				alert(document.winner + " already won the game");
			} 
			else if(square.innerText == ""){
				square.innerText = document.turn;
				switchTurn();				
			} else{
				setMessage("That square is already used.");
			}
		}

		function computerMove(){
			var id = getLastAvailableMove();		 
			nextMove(document.getElementById("s" + id));
		}
		
		function switchTurn(){
			if(checkForWinner(document.turn)){
				setMessage("Congratulations," + document.turn + "! You win!");
				document.winner = document.turn;
				setMessageStyle();
			} 
			else if(!hasAvailableMove()){ 
				setMessage("No winner!");
				document.winner = document.turn;
				setMessageStyle();
			}
			else if(document.turn=="X"){
				document.turn = "O";
				
				if(document.getElementById("computerPlay").checked){
					setMessage("It`s " + document.turn + "`s turn! (computer)" );
					setTimeout(function(){ 
						computerMove();
					}, 1000);					
				}
				else{
					setMessage("It`s " + document.turn + "`s turn!" );
				}
				
				document.getElementById("O-turn").style.backgroundColor = "rgb(234, 82, 114)";
				document.getElementById("X-turn").style.backgroundColor = "#1dead5";				
				
			} else{
				document.turn = "X";
				setMessage("It`s " + document.turn + "`s turn!" );
				document.getElementById("X-turn").style.backgroundColor = "rgb(234, 82, 114)";
				document.getElementById("O-turn").style.backgroundColor = "#1dead5";
			} 			
		}

		function setMessageStyle(){
				document.getElementById("message").style.fontSize = "25px";
				document.getElementById("message").style.backgroundColor = "#ea5272";
				document.getElementById("reset-game").style.display = "block";
				document.getElementById("O-turn").style.backgroundColor = "#1dead5";
				document.getElementById("X-turn").style.backgroundColor = "#1dead5";		
		}
		
		function checkForWinner(move){
			var result = false;
			if (checkRow(1, 2, 3, move) || 
				checkRow(4, 5, 6, move) || 
				checkRow(7, 8, 9, move) || 
				checkRow(1, 4, 7, move) || 
				checkRow(2, 5, 8, move) || 
				checkRow(3, 6, 9, move) ||
				checkRow(1, 5, 9, move) ||
				checkRow(3, 5, 7, move)) {

				result = true;
			}
			return result;
		}

		function checkRow(a, b, c, move){
			var result = false;
			if(getBox(a) == move && getBox(b) == move && getBox(c) == move){
				result = true;
			}
			return result;
		}

		function getBox(number){
			return document.getElementById("s" + number).innerText;
		}

		function clearbox(number) {
			document.getElementById("s" + number).innerText = "";
		}

		function hasAvailableMove(){
			var result = false;			
			for (var i = 1; i<=9; i = i + 1){			
				if(!result){
					result = document.getElementById("s" + i).innerText == "";			
				}			
			}			
			return result;		
		}
		
		function getLastAvailableMove(){
			var result = null;			
			for (var i = 1; i<=9; i = i + 1){							
				if(document.getElementById("s" + i).innerText == ""){
					result = i;
				}													
			}			
			return result;		
		}