var workMinutes = document.querySelector(".settings__time-work .settings__time-digits");
var breakMinutes = document.querySelector(".settings__time-break .settings__time-digits");
var buttons = document.querySelectorAll(".settings__time-button");
var clockTime = document.querySelector(".clock-time");
var infoIcon = document.querySelector(".app-info__icon");
var infoModal = document.querySelector(".app-info__modal");
var infoOverly = document.querySelector(".app-info__overly");
var infoModalClose = document.querySelector(".app-info__close");
var playBtn = document.querySelector(".clock-container__play");
var pauseBtn = document.querySelector(".clock-container__pause");
var stopBtn = document.querySelector(".clock-container__stop");
var clockSession = document.querySelector(".clock-session");
var settingMessage = document.querySelector(".settings__message");
var clockMessage = document.querySelector(".clock-message");
var displaySessionsCount = document.querySelector(".clock-session__count");
var i;
var countTime;
var notification;
var sessionsCountWork = 1;
var sessionsCountBreak = 0;
var workSession = 25;
var breakSession = 5;
var zero = "0";
var seconds = 10;
var minutes = workSession;

/******  Work and break session settings  ******/

  // listening for a button click
for(i = 0; i < buttons.length; i++){
  var clickedBtn = buttons[i];

  clickedBtn.addEventListener("click", function(e){
    var workBtnData = e.target.dataset.workBtn;
    var breakBtnData = e.target.dataset.breakBtn;
    var workMinutesVal = parseInt(workMinutes.textContent);
    var breakMinutesVal = parseInt(breakMinutes.textContent);

    clearInterval(countTime);
    clockSession.innerHTML = "Work";
    seconds = 10;

    // change work time
    if(workBtnData == "-" && workMinutesVal > 1){
      workSession = workMinutesVal - 1;
      if(workSession == 1){
        settingMessage.innerHTML = "You should work at lest 15 minutes!";
        settingMessage.style.visibility = "visible";
        settingMessage.style.opacity = 1;
        setTimeout(hideMessage, 3000);
      }
      if(workSession < 10){
        clockTime.innerHTML = [zero + workSession, "00"].join(":");
      }else{
        clockTime.innerHTML = [workSession, "00"].join(":");
      }
      workMinutes.innerHTML = workSession + "m";
    }else if(workBtnData == "+" && workMinutesVal < 60){
      workSession = workMinutesVal + 5;
      if(workSession < 10){
        clockTime.innerHTML = [zero + workSession, "00"].join(":");
      }else{
        clockTime.innerHTML = [workSession, "00"].join(":");
      }
      workMinutes.innerHTML = workSession  + "m";
    // change break time
    }else if(breakBtnData == "-" && breakMinutesVal > 1){
      breakSession = breakMinutesVal - 1;
      if(breakSession == 1){
        settingMessage.innerHTML = "You should rest at least 1 minute!";
        settingMessage.style.visibility = "visible";
        settingMessage.style.opacity = 1;
        setTimeout(hideMessage, 3000);
      }
      breakMinutes.innerHTML = breakSession  + "m";
    }else if(breakBtnData == "+" && breakMinutesVal < 30){
      breakSession = breakMinutesVal + 1;
      breakMinutes.innerHTML = breakSession  + "m";
    }
  });
}

/******  Hide settings Message  ******/
function hideMessage(){
  if(settingMessage.style.visibility == "visible"){
    settingMessage.style.visibility = "hidden";
    settingMessage.style.opacity = 0;
  }else if(clockMessage.style.visibility == "visible"){
    clockMessage.style.visibility = "hidden";
    clockMessage.style.opacity = 0;
  }
}

/******  Modal window  ******/
// show info about pomodoro technique
infoIcon.addEventListener("click", function(){
  infoModal.classList.add("app-info--show");
  infoOverly.classList.add("app-info--show");
});
  // close modal with info
infoModalClose.addEventListener("click", function(){
  infoModal.classList.remove("app-info--show");
  infoOverly.classList.remove("app-info--show");
});

/******  Clock  ******/

// Timeout
function runClock(){
  displaySessionsCount.innerHTML = "Session " + sessionsCountWork;
  if(sessionsCountBreak > 3){
    clearInterval(countTime);
    minutes = zero + 0;
    clockSession.innerHTML = "Work";
    displaySessionsCount.innerHTML = "Session 4";
    clockTime.innerHTML = [minutes, seconds].join(":");
    clockMessage.style.visibility = "visible";
    clockMessage.style.opacity = 1;
    setTimeout(hideMessage, 60000);

  }else{
    countdown();
  }
}

// Countdown time
function countdown(){

  if(minutes == 0 && seconds == 0){

    if(clockSession.textContent == "Work"){
      notification = new Audio("sounds/short.mp3");
      notification.play();
      minutes = breakSession;
      sessionsCountBreak++;

      // add another ziro to minutes
      if(minutes < 10){
        minutes = zero + breakSession;
        clockTime.innerHTML = [minutes, seconds].join(":");
      }else{
        clockTime.innerHTML = [minutes, seconds].join(":");
      }
      clockSession.innerHTML = "Break";
    }else{
      sessionsCountWork++;
      notification = new Audio("sounds/elevator.mp3");
      notification.play();
      workSession = parseInt(workMinutes.textContent);
      minutes = workSession;

      // add another ziro to minutes
      if(minutes < 10){
        minutes = zero + workSession;
        clockTime.innerHTML = [minutes, seconds].join(":");
      }else{
        clockTime.innerHTML = [minutes, seconds].join(":");
      }
      clockSession.innerHTML = "Work";
    }

  }else if(seconds > 0){
    seconds--;

    // add another ziro to seconds
    if(seconds < 10){
      seconds = zero + seconds;
      clockTime.innerHTML = [minutes, seconds].join(":");
    }else{
      clockTime.innerHTML = [minutes, seconds].join(":");
    }
    if(minutes > 0){
      minutes = workSession;
      minutes--;
      // add another ziro to minutes
      if(minutes < 10){
        minutes = zero + minutes;
        clockTime.innerHTML = [minutes, seconds].join(":");
      }else{
        clockTime.innerHTML = [minutes, seconds].join(":");
      }
    }
  }else{
    workSession = minutes;
    seconds = 10;
    seconds--;
    minutes--;

    // add another ziro to seconds
    if(seconds < 10){
      seconds = zero + seconds;
      clockTime.innerHTML = [minutes, seconds].join(":");
    }else{
      clockTime.innerHTML = [minutes, seconds].join(":");
    }
    // add another ziro to minutes
    if(minutes < 10){
      minutes = zero + minutes;
      clockTime.innerHTML = [minutes, seconds].join(":");
    }else{
      clockTime.innerHTML = [minutes, seconds].join(":");
    }
  }
}

/*******  Clock buttons  *******/

// start clock
playBtn.addEventListener("click", function(){
  countTime = setInterval(runClock, 1000);
});
// pause clock
pauseBtn.addEventListener("click", function(){
  clearInterval(countTime);
});
  // stop clock
stopBtn.addEventListener("click", function(){
  clearInterval(countTime);
  seconds = 10;
  displaySessionsCount.innerHTML = "Session 1";
  clockSession.innerHTML = "Work";

  // add another ziro to minutes
  if(parseInt(workMinutes.textContent) < 10){
    clockTime.innerHTML = [zero + parseInt(workMinutes.textContent), "00"].join(":");
  }else{
    clockTime.innerHTML = [parseInt(workMinutes.textContent), "00"].join(":");
  }
});
// sort out break sessions, reduce them to 3
// correct media queries view height and app title
// prevent session time show before stop of clock
