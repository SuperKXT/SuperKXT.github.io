/* VARIABLES AND CONSTANTS TO BE USED THROUGH OUT THE GAME,
 LISTED HERE TO ISOLATE THEM FROM THE GAME CODE.*/
 
//the starting point
var STARTING_X;
var STARTING_Y;

//the ending point
var ENDING_X;
var ENDING_Y;
    

//the selected box when the level starts
var current_x;
var current_y;

// Stores the currently selected box's coordinates, used to id the box.    
var element; 

// Score Counter
var score;

// Level Counter
var level;

// Remaining Pipes Counter
var totalRemaining;
// Current remaining
var remaining;

// Time between two water flows.
var time;

// Time before the next flow.
var  remaining_Time;

// The current position of water
var water_x;
var water_y;

// Direction of the water flow
//  1 = left
//  2 = right
//  3 = up
//  4 = down
var direction;

//Interval variable, stores the interval time.
var interval;

//High Scores
var high = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];