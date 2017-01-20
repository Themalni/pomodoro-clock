var workMinutes = document.querySelector(".settings__time-work .settings__time-digits");
var breakMinutes = document.querySelector(".settings__time-break .settings__time-digits");
var buttons = document.querySelectorAll(".settings__time-button");
var workTimeReset = document.querySelector(".settings__work-reset");
var breakTimeReset = document.querySelector(".settings__break-reset");
var clockTime = document.querySelector(".clock-time");
var infoIcon = document.querySelector(".app-info__icon");
var infoModal = document.querySelector(".app-info__modal");
var infoOverly = document.querySelector(".app-info__overly");
var infoModalClose = document.querySelector(".app-info__close");
var playBtn = document.querySelector(".clock-container__play");
var pauseBtn = document.querySelector(".clock-container__pause");
var stopBtn = document.querySelector(".clock-container__stop");
var alarm = document.querySelector(".clock-alarm");
var clockSession = document.querySelector(".clock-session");
var settingMessage = document.querySelector(".settings__message");
var i;
var countTime;
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
          if(workBtnData == "-" && workMinutesVal > 5){
            workSession = workMinutesVal - 5;
              if(workSession == 5){
                settingMessage.innerHTML = "You can't work less than 5 minutes!";
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
     settingMessage.style.visibility = "hidden";
     settingMessage.style.opacity = 0;
   }

/******  Modal window  ******/
  // show info about pomodoro technique
  infoIcon.addEventListener("click", function(e){
    infoModal.classList.add("app-info--show");
    infoOverly.classList.add("app-info--show");
  });
  // close modal with info
  infoModalClose.addEventListener("click", function(e){
    infoModal.classList.remove("app-info--show");
    infoOverly.classList.remove("app-info--show");
  });

/******  Clock Countdown  ******/
  function countdown(){

        if(minutes == 0 && seconds == 0){
            if(clockSession.textContent == "Break"){
              var sessionsCount = 0;

              if(++sessionsCount === 4){
                clearInterval(countTime);
                console.log(sessionsCount);
              }


            }else{
              alarm.play();
              minutes = breakSession;

              // add another ziro to minutes
              if(minutes < 10){
                minutes = zero + breakSession;
                clockTime.innerHTML = [minutes, seconds].join(":");
              }else{
                clockTime.innerHTML = [minutes, seconds].join(":");
              }
              clockSession.innerHTML = "Break";
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
  playBtn.addEventListener("click", function(e){
    countTime = setInterval(countdown, 1000);
  });
  // pause clock
  pauseBtn.addEventListener("click", function(e){
    clearInterval(countTime);
  });
  // stop clock
  stopBtn.addEventListener("click", function(e){
    clearInterval(countTime);
      seconds = 10;
      clockSession.innerHTML = "Work";

      // add another ziro to minutes
      if(parseInt(workMinutes.textContent) < 10){
        clockTime.innerHTML = [zero + parseInt(workMinutes.textContent), "00"].join(":");
      }else{
        clockTime.innerHTML = [parseInt(workMinutes.textContent), "00"].join(":");
      }
  });
// convert audio and change sound
// add break session to countdown process
// change seconds to 60
