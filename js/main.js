var currentGyro = 0;
var offsetGyro = 0;
var TimerCounter = null;
var IntervalTimer;
var timerFrom = 135;
var timerCounter = true;
var checkboxCounter = 0;
var checkboxGone = false;
$(document).ready(function() {
    // sets a function that will be called  when the robot connects/disconnects
    NetworkTables.addRobotConnectionListener(onRobotConnection, true);


    // sets a function that will be called when any NetworkTables key/value changes
    NetworkTables.addGlobalListener(onValueChanged, true);

    // hook up our SendableChoosers to combo boxes
    attachSelectToSendableChooser("#auto-selector", "/SmartDashboard/Autonomous Mode");

});

function startTimer(){
    if(IntervalTimer == null){
        IntervalTimer = setInterval(timer, 1000)
    }
}
function timer(){
    if(timerCounter){
        if(timerFrom >= 1 ){
            timerFrom = timerFrom - 1;
            document.getElementById("timer").innerHTML = timerFrom;
        }
        else{
            document.getElementByID("timer").innerHTML = "Finished";
        }
    }
}
function resetTimer(){
    clearInterval(IntervalTimer);
    timerFrom = 135;
    IntervalTimer = null;
    document.getElementById("timer").innerHTML = 135;
}
function resetGyro() {
    offsetGyro = currentGyro;
    rotateCompass(currentGyro + Math.PI);
}

function updateLifterStatus(id) {
    $("#l1").attr("class", "hidden-status");
    $("#l2").attr("class", "hidden-status");
    $("#l3").attr("class", "hidden-status");
    $("#l4").attr("class", "hidden-status");
    $("#" + id).attr("class", "inline");
}

function onValueChanged(key, value) {
    switch (key) {
        case "/SmartDashboard/gyro":
            rotateCompass(value + Math.PI);
            break;
        case "/robot/mode":
            if (value === "teleop"){
                startTimer();
                break;
            }
            if (value === "disabled") {
                resetTimer();
                break;
            }
            break;
        case "/lifter/state":
            if (value === "switch_height") {
                updateLifterStatus("l1");
            } else if (value === "lower_scale") {
                updateLifterStatus("l2");
            } else if (value === "balanced_scale") {
                updateLifterStatus("l3");
            } else if (value === "upper_scale") {
                updateLifterStatus("l4");
            }
    }
}

function onRobotConnection(connected) {
    if (connected) {
        $("#connection").text("Connected");
        $("#connection").css({
            "color": "#4CAF50"
        });
    } else {
        $("#connection").text("Disconnected");
        $("#connection").css({
            "color": "rgb(223, 48, 48)"
        });

    }
}

function remove_form(){
    var checkbox1 = document.getElementById("checkbox1").checked;
    var checkbox2 = document.getElementById("checkbox2").checked;
    var checkbox3 = document.getElementById("checkbox3").checked;
    var checkbox4 = document.getElementById("checkbox4").checked;
    var checkbox5 = document.getElementById("checkbox5").checked;
    var checkbox6 = document.getElementById("checkbox6").checked;
    var checkbox7 = document.getElementById("checkbox7").checked;
    var checkbox8 = document.getElementById("checkbox8").checked;
    if(checkbox1 === true && checkbox2 === true &&  checkbox3 === true && checkbox4 === true && checkbox5 === true && checkbox6 === true && checkbox7 === true && checkbox8 === true){
        $(".checklist").hide();
        $(".hidden").show();
        $(".hiddengyro").show();
        checkboxGone =true;
    }
    else{
        null;
    }
}
function rotateCompass(heading) {
    heading = heading - offsetGyro;
    heading = Math.PI - heading; // gyro is the wrong way around
    var robot = document.getElementById("compass");
    robot.style.transform = "rotate(" + heading + "rad)";
}