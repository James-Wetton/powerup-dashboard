var currentGyro = 0;
var offsetGyro = 0;
var TimerCounter = null;
var IntervalTimer;
var timerFrom = 135;
var timerCounter = true;

function startTimer(){
    if(IntervalTimer == null){
        IntervalTimer = setInterval(timer, 1000)
    }
}
function timer(){
    if(timerCounter){
        timerFrom = timerFrom - 1;
        document.getElementById("timer").innerHTML = timerFrom;
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
            if (value === "teleop") {
                startTimer();
            }
            if (value != "disabled") {
                timerReset();
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

function remove_form() {
    $(".checklist").hide();
    $(".hidden").show();
    $(".hiddengyro").show();
}

function rotateCompass(heading) {
    heading = heading - offsetGyro;
    heading = Math.PI - heading; // gyro is the wrong way around
    var robot = document.getElementById("compass");
    robot.style.transform = "rotate(" + heading + "rad)";
}