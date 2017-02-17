var workMinutes = document.querySelector(".settings__time-work .settings__time-digits");
var breakMinutes = document.querySelector(".settings__time-break .settings__time-digits");
var buttons = document.querySelectorAll(".settings__time-button");
var clockTime = document.querySelector(".clock-time");
var infoIcon = document.querySelector(".app-info__icon");
var infoModal = document.querySelector(".app-info__modal");
var infoOverly = document.querySelector(".app-info__overly");
var infoModalClose = document.querySelector(".app-info__close");
var playBtn = document.querySelector(".clock__btn__play");
var pauseBtn = document.querySelector(".clock__btn__pause");
var resetBtn = document.querySelector(".clock__btn__reset");
var clockSession = document.querySelector(".clock-session");
var settingsMessage = document.querySelector(".settings__message");
var clockMessage = document.querySelector(".clock-message");
var displaySessionsCount = document.querySelector(".clock-session__count");
var countTime;
var notification;
var sessionsCountWork = 1;
var sessionsCountBreak = 0;
var workSession = 25;
var breakSession = 5;
var zero = "0";
var seconds = 60;
var minutes = workSession;

/******  Work and break session settings  ******/

function setTime(){
  var clickedBtn = [].slice.call(buttons);
  clickedBtn.map(function(button){
    button.addEventListener("click", function(e){
      var workBtnData = e.target.dataset.workBtn;
      var breakBtnData = e.target.dataset.breakBtn;
      var workMinutesVal = parseInt(workMinutes.textContent);
      var breakMinutesVal = parseInt(breakMinutes.textContent);
      var settingsText = "";

      clearInterval(countTime);
      clockSession.innerHTML = "Work";
      seconds = 60;

      // change work time
      if(workBtnData == "-" && workMinutesVal > 5){
        workSession = workMinutesVal - 5;
        if(workSession == 5){
          settingsText = "You should work at least 5 minutes!";
          showMessage(settingsMessage, settingsText);
          setTimeout(hideMessage, 3000, settingsMessage);
        }
        displayTime(workSession, 0);
        workMinutes.innerHTML = workSession + "m";

      }else if(workBtnData == "+" && workMinutesVal < 60){
        workSession = workMinutesVal + 5;
        displayTime(workSession, 0);
        workMinutes.innerHTML = workSession  + "m";

      // change break time
      }else if(breakBtnData == "-" && breakMinutesVal > 1){
        breakSession = breakMinutesVal - 1;
        if(breakSession == 1){
          settingsText = "You should rest for at least 1 minute!";
          showMessage(settingsMessage, settingsText);
          setTimeout(hideMessage, 3000, settingsMessage);
        }
        breakMinutes.innerHTML = breakSession  + "m";
      }else if(breakBtnData == "+" && breakMinutesVal < 30){
        breakSession = breakMinutesVal + 1;
        breakMinutes.innerHTML = breakSession  + "m";
      }
    });
  });
}
setTime();

/***** Display time on the page  *****/

function displayRunningTime(sessionName, min, sec){
  if(min < 10){
    min = zero + sessionName;
    /*sec = zero + seconds;*/
    clockTime.innerHTML = [min, sec].join(":");
  }else if(sec < 10){
    sec = zero + seconds;
    clockTime.innerHTML = [min, sec].join(":");
  }else{
    clockTime.innerHTML = [min, sec].join(":");
  }
}

function displayTime(min, sec){
  if(min < 10){
    min = zero + min;
    if(sec < 10){
      sec = zero + sec;
      clockTime.innerHTML = [min, sec].join(":");
    }else{
      clockTime.innerHTML = [min, sec].join(":");
    }
    /*sec = zero + sec;*/

  }else if(sec < 10){
    sec = zero + sec;
    clockTime.innerHTML = [min, sec].join(":");
  }else{
    clockTime.innerHTML = [min, sec].join(":");
  }
}

/*****  Reset Clock  *****/
function resetClock(min){
  seconds = 60;
  sessionsCountBreak = 0;
  sessionsCountWork = 4;
  clockSession.innerHTML = "Work";
  // add another ziro to minutes
  if(min < 10){
    min = zero + min;
    clockTime.innerHTML = [min, "00"].join(":");
  }else{
    clockTime.innerHTML = [min, "00"].join(":");
  }
}

/******  Clock  ******/

// Timeout
function runClock(){

  if(sessionsCountBreak > 3){
    clearInterval(countTime);
    resetClock(0);
    displaySessionsCount.innerHTML = "Session 4";
  }else{
    countdown();
    displaySessionsCount.innerHTML = "Session " + sessionsCountWork;
  }
}

// Countdown time
function countdown(){

  if(minutes == 0 && seconds == 0){

    // worked for 4 sessions
    if(sessionsCountWork == 4){
      minutes = parseInt(workMinutes.textContent);
      clockSession.innerHTML = "Work";
      var clockText = "Take a longer break now then restart Pomodoro!";
      showMessage(clockMessage, clockText);
      clearInterval(countTime);
      resetClock(0);
    }
    else {
      // Work session finished
      if(clockSession.textContent == "Work"){
        sessionsCountBreak++;
        breakSession = parseInt(breakMinutes.textContent);
        minutes = breakSession;
        displayRunningTime(breakSession, minutes, seconds);
        clockSession.innerHTML = "Break";
        notification = new Audio("sounds/elevator.mp3");
        notification.play();
      //Break session finished
      }else if(clockSession.textContent == "Break"){
        sessionsCountWork++;
        workSession = parseInt(workMinutes.textContent);
        minutes = workSession;
        displayRunningTime(workSession, minutes, seconds);
        clockSession.innerHTML = "Work";
        notification = new Audio("sounds/short.mp3");
        notification.play();
      }
    }
  }else if(seconds > 0){
    seconds--;
    displayTime(minutes, seconds);
    if(minutes > 0){
      minutes = workSession;
      minutes--;
      displayTime(minutes, seconds);
    }
  }else{
    workSession = minutes;
    seconds = 60;
    seconds--;
    minutes--;
    displayTime(minutes, seconds);
  }
}

/*******  Clock buttons  *******/

// start clock
playBtn.addEventListener("click", function(){
  workSession = parseInt(workMinutes.textContent);
  sessionsCountWork = 1;
  clearInterval(countTime);
  countTime = setInterval(runClock, 1000);
  hideMessage(clockMessage);
});
// pause clock
pauseBtn.addEventListener("click", function(){
  clearInterval(countTime);
});
// reset clock
resetBtn.addEventListener("click", function(){
  clearInterval(countTime);
  seconds = 60;
  workSession = 25;
  workMinutes.textContent = 25 + "m";
  breakMinutes.textContent = 5 + "m";
  displaySessionsCount.innerHTML = "Session 1";
  displayTime(workSession, 0);
  hideMessage(clockMessage);
});

/******  Show Message  ******/
function showMessage(message, text){
  message.innerHTML = text;
  message.style.visibility = "visible";
  message.style.opacity = 1;
}

/******  Hide Message  ******/
function hideMessage(message){
  message.style.visibility = "hidden";
  message.style.opacity = 0;
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
