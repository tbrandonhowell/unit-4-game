console.log ("we are connected");

window.onload = function() { // is there a jquery equivalent for this? or a better way to code it?

// declare functions

function logIt() {
    console.log("goal = " + goal);
    console.log("gameTotal = " + gameTotal);
    console.log("crystal 0 = " + crystal[0]);
    console.log("crystal 1 = " + crystal[1]);
    console.log("crystal 2 = " + crystal[2]);
    console.log("crystal 3 = " + crystal[3]);
    console.log("wins = " + wins);
    console.log("losses = " + losses);
}

function uniqueRand(range,floor) { // this will set a random number, but if the random number already exists in the array, it will continue to pick a new random number until it is unique. In theory this could create an infinite loop but statistically its quite unlikely
    var r = Math.floor(Math.random() * range) + floor;
    console.log("random number selected");
    while(crystal.indexOf(r) > -1) {
        var r = Math.floor(Math.random() * range) + floor;
        console.log("random number selected");
    }
    return r;
}

function resetIt() { // resets for the next round
    goal = Math.floor(Math.random() * 101) + 19; // set random value for game target from 19-120
    gameTotal = 0; // reset the game total
    // could to a loop for these, but there's only four in this game:
    crystal[0] = uniqueRand(12,1);
    crystal[1] = uniqueRand(12,1);
    crystal[2] = uniqueRand(12,1);
    crystal[3] = uniqueRand(12,1);
    $("#goal").html(goal); // write the goal to the DOM
    $("#score").html(gameTotal); // write the gameTotal to the DOM
}

function buttonPress(x) { // used for every button press
    console.log("Handler for crystal " + x + " called.");
    $("#message1, #message2").text(""); // clear the message 1 and 2 divs to hide the won/lost messages
    gameTotal = gameTotal + crystal[x]; // add the value of the crystal to the gameTotal
    $("#score").html(gameTotal); // update gameTotal in the DOM
    if (gameTotal > goal) {
        losses++; // increment the losses counter
        $("#losses").html(losses); // update the DOM w/ loss count
        $("#message1, #message2").text("You Lost!"); // update the message to say you lost
        $("#message1, #message2").attr("class","loserText"); // set message color to red
        resetIt(); // reset the round
    } else if (gameTotal == goal) {
        wins++; // increment the wins counter
        $("#wins").html(wins); // update the DOM w/ win count
        $("#message1, #message2").text("You Won!"); // update the message to say you won
        $("#message1, #message2").attr("class","winnerText"); // set message color to green
        resetIt(); // reset the round
    } else {
        // don't do anything
    }
    logIt();
}

// initiate variables before the first game is started

var goal; // the current game's points goal
var wins = 0; // county of wins
var losses = 0; // count of losses
var gameTotal = 0; // the current game's total points
var crystal = []; // create the array that houses the crystal values

resetIt(); // trigger the reset function once to start the game

logIt(); // console log everything once at the beginning

// watch for clicks and trigger the function w/ the button's data-number value as our input

$( ".crystalButton" ).click(function() {
    buttonPress(
        $(this).attr("data-number") // this actually worked on the first try
    );
});

} // close window.onload