//Loading constant.js
$.getScript("constants.js", function(){
   // loaded
});

// Storing the path for next five pipes
//  1 = left right
//  2 = top bottom
//  3 = square
//  4 = left top
//  5 = left bottom
//  6 = right top
//  7 = right down
//  8 = left right 2 
//  9 = top bottom 2
//  two straight pipes to increase probability 
var pipe1 = getRandomInt();
var pipe2 = getRandomInt();
var pipe3 = getRandomInt();
var pipe4 = getRandomInt();
var pipe5 = getRandomInt();

generatePipes();
current_x = STARTING_X + 1;
current_y = STARTING_Y;

score = 0;
level = 0;
totalRemaining = 4;
remaining = 4;
time = 55;
remaining_Time = time;
water_x = STARTING_X;
water_y = STARTING_Y;
direction = 2;

// 1 second
interval = 1000;

// Level Start Initializer
function start()
{
	// Get the highscores.
	high[0] = document.getElementById("scoreOne").innerHTML;
	high[1] = document.getElementById("scoreTwo").innerHTML;
	high[2] = document.getElementById("scoreThree").innerHTML;
	high[3] = document.getElementById("scoreFour").innerHTML;
	high[4] = document.getElementById("scoreFive").innerHTML;
	high[5] = document.getElementById("scoreSix").innerHTML;
	high[6] = document.getElementById("scoreSeven").innerHTML;
	high[7] = document.getElementById("scoreEight").innerHTML;
	high[8] = document.getElementById("scoreNine").innerHTML;
	high[9] = document.getElementById("scoreTen").innerHTML;
	
    // Clearing all the current boxes and pipes.
    reset();
	interval = 1000;

    var pipe1 = getRandomInt();
    var pipe2 = getRandomInt();
    var pipe3 = getRandomInt();
    var pipe4 = getRandomInt();
    var pipe5 = getRandomInt();

    // Generating the pipes, start and end
    generatePipes();

    // Setting the starting box.
    current_x = STARTING_X + 1;
    current_y = STARTING_Y;

    // Updating the level
    level += 1;

    // Updating the remaining pipes.
    totalRemaining += 1;
    remaining = totalRemaining;

    // Updating the time between two water flows.
    if(time != 5)
    {
        time -= 5;
    }

    // Initializing time before next flow.
    remaining_Time = time;

    // The current position of water.
    water_x = STARTING_X;
    water_y = STARTING_Y;

    // Initializing the direction.
    //  1 = left
    //  2 = right
    //  3 = up
    //  4 = down
    direction = 2;

    // Setting Level and Score to inital values
    head();

    // Setting the initial selected box.
    element = current_y.toString() + current_x.toString();
    document.getElementById(element).focus();

    // initializing the right side
    side();

    // putting the starting and ending pipe
    var temp = STARTING_Y.toString() + STARTING_X.toString();
    //document.getElementById(temp).innerHTML = "<img src= 'pipe_start.png'>";
	document.getElementById(temp).innerHTML = "<span class= 'pipe_start sprite'></span>";
    document.getElementById(temp).setAttribute("data-pipe", "0");

    temp = ENDING_Y.toString() + ENDING_X.toString();
    //document.getElementById(temp).innerHTML = "<img src= 'pipe_end.png'>";
	document.getElementById(temp).innerHTML = "<span class='pipe_end sprite'></span>";
    document.getElementById(temp).setAttribute("data-pipe", "99");
	
	//------------
	//Timer loop
	//------------
	loop = window.setInterval(timerLoop, interval);
}

// Updating the selected box.
function positionUpdate()
{
    element = current_y.toString() + current_x.toString();
    document.getElementById(element).focus();
}

// Loop Function
function timerLoop() {
    document.getElementById("timer").innerHTML = remaining_Time;
    remaining_Time -= 1;
	if (remaining_Time == 1)
	{
		startPipeAnimation();
	}
    else if (remaining_Time == 0) 
    {
        checkNext();
        remaining_Time = time;
    }
}

//------------
//Key Handlers, used for setting / restoring normal speed.
//------------
function keyUpHandler(event)
{
   var keyPressed = event.which || event.keyCode;
    if (keyPressed == 32)   // space key
    {
        interval = (interval == 1000) ? 50 : 1000;
        window.clearInterval(loop);
        loop = window.setInterval(timerLoop, interval);
    }
}

//------------
//Key Down Handler
//------------
function keyDownHandler(event) 
{
    var keyPressed = event.which || event.keyCode;
    if (keyPressed == 38)   //up key
    {	
        if(current_y>0)
        {
            current_y--;
        }
        else
        {
            current_y = 9;
            
        }
        positionUpdate();
    }
    else if (keyPressed == 40)  //down key
    {	
        if(current_y<9)
        {
            current_y++;
        }
        else
        {
            current_y = 0;
        }
        positionUpdate();
    }
    else if (keyPressed == 39)  //right key
    {	
        if(current_x<9)
        {
            current_x++;
        }
        else
        {
            current_x = 0;
        }
        positionUpdate();
    }
    else if (keyPressed == 37)  //left key
    {	
        if(current_x>0)
        {
            current_x--;
        }
        else
        {
            current_x = 9;
        }
        positionUpdate();
    }
    else if (keyPressed == 13) // enter key
    {
		//Pipe already filled.
        if(document.activeElement.hasChildNodes())
        {
            var p = document.activeElement.getAttribute('data-pipe') ;
			//Overwrite if pipe not filled by water, also deduce score.
            if(!(p > 9) && ((p != 0) && (p != 99)))
            {
                //document.activeElement.innerHTML = "<img src= 'pipe_"+pipe1+".png'>";
                document.activeElement.innerHTML = "<span class= 'pipe_"+pipe1+" sprite'></span>";
                document.activeElement.setAttribute("data-pipe", pipe1.toString());
				var aud = document.getElementById("pipe_duplicate");
				aud.play();
                updatePipes();
                side();
                score -= 40;
                head();
            }
			else {
				var aud = document.getElementById("pipe_occupied");
				aud.play();
			}
        }
		else if (keyPressed == 9) {  //tab pressed
			event.preventDefault(); // stops its action
		}
        else
        {
            //document.activeElement.innerHTML = "<img src= 'pipe_"+pipe1+".png'>";
            document.activeElement.innerHTML = "<span class= 'pipe_"+pipe1+" sprite'></span>";
            document.activeElement.setAttribute("data-pipe", pipe1.toString());
			var aud = document.getElementById("pipe_down");
			aud.play();
            updatePipes();
            side();
        }
    }
    else
    {
        // Do nothing for other keys.
    }
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt() {
  return Math.floor(Math.random() * (10 - 1)) + 1;
}


// add a new value to the last pipe 
function updatePipes() {
    pipe1 = pipe2;
    pipe2 = pipe3;
    pipe3 = pipe4;
    pipe4 = pipe5;
    pipe5 = getRandomInt();
}


// Function to update the head
function head() 
{
    document.getElementById("level").innerHTML = "Level: " + level.toString();
    document.getElementById("score").innerHTML = "Score: " + score.toString();
    document.getElementById("remaining").innerHTML =  remaining.toString() + " More";
}

// Function to upate the right hand side.
function side() {
    //document.getElementById("pipe5").innerHTML = "<img src= 'pipe_"+pipe5+".png'>";
	//document.getElementById("pipe4").innerHTML = "<img src= 'pipe_"+pipe4+".png'>";
    //document.getElementById("pipe3").innerHTML = "<img src= 'pipe_"+pipe3+".png'>";
    //document.getElementById("pipe2").innerHTML = "<img src= 'pipe_"+pipe2+".png'>";
    //document.getElementById("pipe1").innerHTML = "<img src= 'pipe_"+pipe1+".png'>";
    document.getElementById("pipe5").innerHTML = "<span class= 'pipe_"+pipe5+" sprite'></span>";
    document.getElementById("pipe4").innerHTML = "<span class= 'pipe_"+pipe4+" sprite'></span>";
    document.getElementById("pipe3").innerHTML = "<span class= 'pipe_"+pipe3+" sprite'></span>";
    document.getElementById("pipe2").innerHTML = "<span class= 'pipe_"+pipe2+" sprite'></span>";
    document.getElementById("pipe1").innerHTML = "<span class= 'pipe_"+pipe1+" sprite'></span>";
    document.getElementById("logo").innerHTML = "<img src= 'logo.png'>";
}

//animating the start pipe, indicating the coming wave.
function startPipeAnimation() {
	var aud = document.getElementById("water_flow");
	aud.play();
	if(water_x == STARTING_X && water_y == STARTING_Y)
    {
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'pipe_start_a_1 sprite'></span>";
		}, 250); 
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'pipe_start_a_2 sprite'></span>";
		}, 500);
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'pipe_start_a_3 sprite'></span>";
		}, 750);
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'f_pipe_start sprite'></span>";
		}, 1000);		
    }	
	else {
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'f_pipe_start_a_1 sprite'></span>";
		}, 250); 
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'f_pipe_start_a_2 sprite'></span>";
		}, 500);
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'f_pipe_start_a_3 sprite'></span>";
		}, 750);
		setTimeout(function(){			
			document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<span class= 'f_pipe_start sprite'></span>";
		}, 1000);
	}
}

// Check the next Box to see if there is a connected pipe.
    //  1 = left
    //  2 = right
    //  3 = up
    //  4 = down
function checkNext()
{
    if(direction == 1)
    {
        water_x = (water_x==0) ? 9 : water_x-1;
        var temp = parseInt(document.getElementById((water_y).toString() + water_x.toString()).getAttribute("data-pipe"));
		
       if(temp == 1)
        {
            direction = 1;
            fillCurrent(1);
        }
        else if(temp == 3 || temp == '23')
        {
            direction = 1;
            fillCurrent(3);
        }
        else if(temp == 6)
        {
            direction = 3;
            fillCurrent(6);
        }
        else if(temp == 7)
        {
            direction = 4;
            fillCurrent(7);
        }
        else if(temp == 8)
        {
            direction = 1;
            fillCurrent(8);
        }
        else
        {
            gameOver();
        }
    }
    else if(direction == 2)
    {
        water_x = (water_x == 9) ? 0 : water_x + 1;
        var temp = document.getElementById((water_y).toString() + water_x.toString()).getAttribute("data-pipe");

        if(temp == 1)
        {
            direction = 2;
            fillCurrent(1);
            winCheck();
        }
        else if(temp == 3 || temp == '23')
        {
            direction = 2;
            fillCurrent(3);
            winCheck();
        }
        else if(temp == 4)
        {
            direction = 3;
            fillCurrent(4);
        }
        else if(temp == 5)
        {
            direction = 4;
            fillCurrent(5);
        }
        else if(temp == 8)
        {
            direction = 2;
            fillCurrent(8);
            winCheck();
        }
        else
        {
            gameOver();
        }
    }
    else if(direction == 3)
    {
        water_y = (water_y==0) ? 9 : water_y-1;
        var temp = document.getElementById(water_y.toString() + (water_x).toString()).getAttribute("data-pipe");
        if(temp == 2)
        {
            direction = 3;
            fillCurrent(2);
        }
        else if(temp == 3 || temp == '13')
        {
            direction = 3;
            fillCurrent(3);
        }
        else if(temp == 5)
        {
            direction = 1;
            fillCurrent(5);
        }
        else if(temp == 7)
        {
            direction = 2;
            fillCurrent(7);
            winCheck();
        }
        else if(temp == 9)
        {
            direction = 3;
            fillCurrent(9);
        }
        else
        {
            gameOver();
        }    
    }
    else if(direction == 4)
    {
        water_y = (water_y==9) ? 0 : water_y+1;
        var temp = document.getElementById(water_y.toString() + (water_x).toString()).getAttribute("data-pipe");
        if(temp == 2)
        {
            direction = 4;
            fillCurrent(2);
        }
        else if(temp == 3 || temp == '13')
        {
            direction = 4;
            fillCurrent(3);
        }
        else if(temp == 4)
        {
            direction = 1;
            fillCurrent(4);
        }
        else if(temp == 6)
        {
            direction = 2;
            fillCurrent(6);
            winCheck();
        }
        else if(temp == 9)
        {
            direction = 4;
            fillCurrent(9);
        }
        else
        {
            gameOver();
        }           
    }
}

// Fill the current pipe with water by changing the image to filled pipe
// data-pipe
//  0 = start
//	99 = end
//  1 = left right
//  2 = top bottom
//  3 = square
//  4 = left top
//  5 = left bottom
//  6 = right top
//  7 = right downfunction fillCurrent(curr_pipe)
//  8 = left right 2
//  9 = top down 2
//  13 = square horizontally filled
//  23 = square vertically filled
//  33 = square filled
//  11,12,14,15,16,17,18,19 = filled pipes
function fillCurrent(curr_pipe) {
	// current pipe is double ended.
	if(curr_pipe == 3) 
	{
		if(direction == 1 || direction == 2) 
		{
			var pipe = document.getElementById((water_y).toString() + water_x.toString()).getAttribute('data-pipe');
			if(pipe == '23')
			{
				//document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<img src= 'f_pipe_3.png'>";
				document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<span class= 'f_pipe_3 sprite'></span>";
				document.getElementById((water_y).toString() + water_x.toString()).setAttribute('data-pipe', '33');
				score += 150;
			}
			else
			{
				//document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<img src= 'f_h_pipe_3.png'>";
				document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<span class= 'f_h_pipe_3 sprite'></span>";
				document.getElementById((water_y).toString() + water_x.toString()).setAttribute('data-pipe', '13');
				score += 50;
			}
		}
		else if(direction == 3 || direction == 4)
		{
			var pipe = document.getElementById((water_y).toString() + water_x.toString()).getAttribute('data-pipe');
			if(pipe == '13')
			{
				//document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<img src= 'f_pipe_3.png'>";
				document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<span class= 'f_pipe_3 sprite'></span>";
				document.getElementById((water_y).toString() + water_x.toString()).setAttribute('data-pipe', '33');
				score += 150;
			}
			else
			{
				//document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<img src= 'f_v_pipe_3.png'>";
				document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<span class= 'f_v_pipe_3 sprite'></span>";
				document.getElementById((water_y).toString() + water_x.toString()).setAttribute('data-pipe', '23');		
				score += 50;
			}
		}
	}
	//all other pipes.
	else 
	{
		//document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<img src= 'f_pipe_" + curr_pipe + ".png'>";
		document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<span class= 'f_pipe_" + curr_pipe + " sprite'></span>";
		document.getElementById((water_y).toString() + water_x.toString()).setAttribute('data-pipe', '1' + curr_pipe);
		score += 50;
	}
     remaining = (remaining > 0) ? remaining - 1 : remaining;
     head();
}

// Game Over!
function gameOver() 
{
	window.clearInterval(loop);
	document.getElementById("endScreen").style.display = "block";
	for(i=0; i<10; i++)
	{
		if(high[i] < score)
		{
			document.getElementById("scoreSend").value = score.toString();
			document.getElementById("gameOverHigh").style.display = "block";
			document.getElementById("name").focus();
			break;
		}
		else if(i == 9) 
		{
			document.getElementById("gameOver").style.display = "block";
			document.getElementById("gameOverScore").innerHTML = "Score: " + score;
			document.getElementById("gameOverBack").focus();
		}
	}
	var aud = document.getElementById("game_lose");
	aud.play();
	//resetting variables
	var pipe1 = getRandomInt();
	var pipe2 = getRandomInt();
	var pipe3 = getRandomInt();
	var pipe4 = getRandomInt();
	var pipe5 = getRandomInt();
	generatePipes();
	current_x = STARTING_X + 1;
	current_y = STARTING_Y;
	score = 0;
	level = 0;
	totalRemaining = 4;
	remaining = 4;
	time = 55;
	remaining_Time = time;
	water_x = STARTING_X;
	water_y = STARTING_Y;
	direction = 2;
	interval = 1000;
}

// Check if the next pipe is end pipe
function winCheck()
{
	if(water_x != 9)
	{
		var temp = document.getElementById((water_y).toString() + (water_x+1).toString()).getAttribute("data-pipe");
	}
    if (temp == "end")
    {
        if (remaining == 0) 
        {
            gameWon();
        }
        else
        {
            gameOver();
        }
    }
}

// Game Won
function gameWon()
{
	var aud = document.getElementById("game_win");
	aud.play();
	window.clearInterval(loop);
	document.getElementById("endScreen").style.display = "block";
	document.getElementById("gameWon").style.display = "block";
	document.getElementById("gameWonScore").innerHTML = "Score: " + score;
	document.getElementById("gameWonContinue").focus();
}

// Generate the starting and ending pipe
function generatePipes()
{
    STARTING_X = Math.floor(Math.random() * (9));
    STARTING_Y = Math.floor(Math.random() * (10)) ;

    ENDING_Y = Math.floor(Math.random() * (10)) ;

    var temp = Math.floor(Math.random() * (10 - 1)) + 1;
    while((STARTING_Y == ENDING_Y) && ((temp == STARTING_X) || (temp == STARTING_X+1) || (temp == STARTING_X+2)))
    {
        temp = Math.floor(Math.random() * (10 - 1)) + 1;
    }
    ENDING_X = temp;
}


// clearing the boxes after the level ends.
function reset()
{
    var i;
    for (i = 0; i < 10; i++)
    {
        var j;
        for (j = 0; j < 10; j++)
        {
            document.getElementById(j.toString() + i.toString()).innerHTML = '';
            document.getElementById(j.toString() + i.toString()).setAttribute('data-pipe', 'none');
        }
    }
}

function keyDownEnd(event) 
{
    var keyPressed = event.which || event.keyCode;
    if (keyPressed == 13) // enter key
    {
		if(document.activeElement.id  == "gameOverBack")
		{
			document.getElementById('endScreen').style.display = "none";			
			document.getElementById('gameOver').style.display = "none";			
			document.getElementById('gameOverHigh').style.display = "none";			
			document.getElementById('gamePlay').style.display = "none";			
			document.getElementById('start').style.display = "block";
			document.getElementById('startGame').focus();
		}
		else if (document.activeElement.id == "gameWonContinue")
		{
			document.getElementById('endScreen').style.display = "none";
			document.getElementById('gameWon').style.display = "none";
			start();
		}
		else if (document.activeElement.id == "name")
		{
			document.forms["highForm"].submit();		
		}
    }
	else if (keyPressed == 9) {  //tab pressed
        event.preventDefault(); // stops its action
    }
}