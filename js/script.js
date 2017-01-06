var workMinutes = document.querySelector(".settings__time-work .settings__time-digits");
var breakMinutes = document.querySelector(".settings__time-break .settings__time-digits");
var buttons = document.querySelectorAll(".settings__time-button");
var workTimeReset = document.querySelector(".settings__work-reset");
var breakTimeReset = document.querySelector(".settings__break-reset");
var clockTime = document.querySelector(".clock-time");
var i;
var seconds = 5;
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
          }else if(breakBtnData == "+" && breakMinutesVal < 60){
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

function runTime(){
      zero = "0";
      minutes = workMinutes.textContent;

      seconds--;
      var countDown = minutes - 1;


        if(seconds == 0){
          seconds = 5;
          /*clearTimeout(count);*/
            countDown -= 1;
            if(countDown < 10){
              countDown = zero + countDown;
              clockTime.innerHTML = countDown + ":" + seconds;
            }else{
              clockTime.innerHTML = countDown + ":" + seconds;
            }
        }
        if(seconds < 10){
            seconds = zero + seconds;
            clockTime.innerHTML = countDown + ":" + seconds;
          }else{
            clockTime.innerHTML = countDown + ":" + seconds;
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
// add start pause and stop buttons
  clock();
