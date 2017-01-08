var workMinutes = document.querySelector(".settings__time-work .settings__time-digits");
var breakMinutes = document.querySelector(".settings__time-break .settings__time-digits");
var buttons = document.querySelectorAll(".settings__time-button");
var workTimeReset = document.querySelector(".settings__work-reset");
var breakTimeReset = document.querySelector(".settings__break-reset");
var clockTime = document.querySelector(".clock-time");
var infoIcon = document.querySelector(".app-info__icon");
var infoModalContainer = document.querySelector(".app-info__container");
var infoModal = document.querySelector(".app-info__modal");
var infoModalClose = document.querySelector(".app-info__close");
var i;
var count = 60;

  // listening for a button click
  for(i = 0; i < buttons.length; i++){
    var clickedBtn = buttons[i];

      clickedBtn.addEventListener("click", function(e){
        var workBtnData = e.target.dataset.workBtn;
        var breakBtnData = e.target.dataset.breakBtn;
        var workMinutesVal = parseInt(workMinutes.textContent);
        var breakMinutesVal = parseInt(breakMinutes.textContent);

          // change work and break time
          if(workBtnData == "-" && workMinutesVal > 0){
            var changeTime = workMinutesVal - 5;
            workMinutes.innerHTML = changeTime;
          }else if(workBtnData == "+" && workMinutesVal < 60){
            changeTime = workMinutesVal + 5;
            workMinutes.innerHTML = changeTime;
          }else if(breakBtnData == "-" && breakMinutesVal > 0){
            changeTime = breakMinutesVal - 5;
            breakMinutes.innerHTML = changeTime;
          }else if(breakBtnData == "+" && breakMinutesVal < 30){
            changeTime = breakMinutesVal + 5;
            breakMinutes.innerHTML = changeTime;
          }
      });
   }

  // reset work time
  workTimeReset.addEventListener("click", function(e){
    workMinutes.innerHTML = 25;
  });
  // reset break time
  breakTimeReset.addEventListener("click", function(e){
    breakMinutes.innerHTML = 5;
  });
  // show info about pomodoro technique
  infoIcon.addEventListener("click", function(e){
    infoModalContainer.style.display = "block";
    infoModal.style.display = "block";
  });
  // close modal
  infoModalClose.addEventListener("click", function(e){
    infoModalContainer.style.display = "none";
    infoModal.style.display = "none";
  });

/*clockTime.innerHTML = workMinutes.textContent + ":" + "00";*/

  // run clock
  function runTime(){
    var zero = "0";
    var minutes = workMinutes.textContent;
    var totalSec = minutes * 60;
    var seconds;


        minutes = Math.floor(totalSec % 3600 / 60);
        seconds = Math.floor(totalSec % 3600 % 60);

        seconds = 60 + seconds;
        console.log(seconds);
        count--;


        // stop clock
        if(count == -1){
          clearTimeout(countTime);
        }

    var displayTime = [minutes, seconds].join(":");

    /*clockTime.innerHTML = displayTime;*/



      /*if(seconds == 0){
        seconds = 10;*/



          // add another ziro to minutes
          if(minutes < 10){
            minutes = zero + minutes;
            clockTime.innerHTML = displayTime;
          }else{
            clockTime.innerHTML = displayTime;
          }

          // add another ziro to seconds
          if(seconds < 10){
              seconds = zero + seconds;
              clockTime.innerHTML = displayTime;
            }else{
              clockTime.innerHTML = displayTime;
            }

  }

  /*var countTime = setInterval(runTime, 1000);*/

  // canvas clock
  function clock(){
    var ctx = document.querySelector("#clock-canvas").getContext("2d");
    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;

        ctx.strokeStyle = "#fef8e7";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasWidth / 2, 100, 0, 6.28, false);
        ctx.stroke();
  }

  clock();

// add start pause and stop buttons
// make minutes to go down by one
