function initialize()
{	
	// end the loading screen and show the start screen.
	document.getElementById("load").style.display = 'none';
	document.getElementById("start").style.display = "block";
	document.getElementById("startGame").focus();
}

//------------
//Key Down Handler
//------------
function keyDownStart(event) 
{
    var keyPressed = event.which || event.keyCode;
    if (keyPressed == 40)
	{		
		if(document.activeElement.id == 'startGame')
		{
			document.getElementById('startHighScore').focus();
		}
		else if(document.activeElement.id == 'startHighScore')
		{
			document.getElementById('startInstructions').focus();
		}
		else if(document.activeElement.id == 'startInstructions')
		{
			document.getElementById('startGame').focus();
		}
    }    
	else if (keyPressed == 38)
	{		
		if(document.activeElement.id == 'startGame')
		{
			document.getElementById('startInstructions').focus();
		}
		else if(document.activeElement.id == 'startHighScore')
		{
			document.getElementById('startGame').focus();
		}
		else if(document.activeElement.id == 'startInstructions')
		{
			document.getElementById('startHighScore').focus();
		}
    }
	else if (keyPressed == 13) // enter key
    {
        if(document.activeElement.id == 'startGame')
		{
			document.getElementById('start').style.display = "none";
			document.getElementById('gamePlay').style.display = "block";
			start();
		}
		else if(document.activeElement.id == 'startHighScore')
		{
			document.getElementById('start').style.display = "none";
			document.getElementById('highScore').style.display = "block";
			document.getElementById('highScoreBack').focus();
		}
		else if(document.activeElement.id == 'startInstructions')
		{
			document.getElementById('start').style.display = "none";
			document.getElementById('instructions').style.display = "block";
			document.getElementById('instructionsBack').focus();
		}
    }
	else if (keyPressed == 9) {  //tab pressed
        event.preventDefault(); // stops its action
    }
}

function mouseClick(e) {
	e.preventDefault(); 
}