var workMinutes = document.querySelector(".settings__time-work .settings__time-digits");
var breakMinutes = document.querySelector(".settings__time-break .settings__time-digits");
var buttons = document.querySelectorAll(".settings__time-button");
var workTimeReset = document.querySelector(".settings__work-reset");
var breakTimeReset = document.querySelector(".settings__break-reset");
var clockTime = document.querySelector(".clock-time");
var i;
var seconds = 60;
var minutes = "";
var zero = "";


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

clockTime.innerHTML = workMinutes.textContent + ":" + "00";

  // run clock
  function runTime(){
    zero = "0";
    minutes = workMinutes.textContent;

    seconds--;
    minutes -= 1;

      if(seconds == 0){
        seconds = 59;
        minutes--;

          // add another ziro to minutes
          if(minutes < 10){
            minutes = zero + minutes;
            clockTime.innerHTML = minutes + ":" + seconds;
          }else{
            clockTime.innerHTML = minutes + ":" + seconds;
          }
      }
      // add another ziro to seconds
      if(seconds < 10){
          seconds = zero + seconds;
          clockTime.innerHTML = minutes + ":" + seconds;
        }else{
          clockTime.innerHTML = minutes + ":" + seconds;
        }
      // stop clock
      if(minutes == 0){
        clearTimeout(count);
      }

  }

  var count = setInterval(runTime, 1000);

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
