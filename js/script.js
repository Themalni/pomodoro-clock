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
var i;
var workSession = "";
var breakSession = "";
var zero = "0";
var seconds = 20;
var minutes = (workSession % 60);


  // listening for a button click
  for(i = 0; i < buttons.length; i++){
    var clickedBtn = buttons[i];

      clickedBtn.addEventListener("click", function(e){
        var workBtnData = e.target.dataset.workBtn;
        var breakBtnData = e.target.dataset.breakBtn;
        var workMinutesVal = parseInt(workMinutes.textContent);
        var breakMinutesVal = parseInt(breakMinutes.textContent);


        if(workSession < 10){
          clockTime.innerHTML = [zero + workSession, seconds].join(":");

        }

          // change work and break time
          if(workBtnData == "-" && workMinutesVal > 0){
            workSession = workMinutesVal - 5;
              if(workSession < 10){
                clockTime.innerHTML = [zero + workSession, seconds].join(":");
              }else{
                clockTime.innerHTML = [workSession, seconds].join(":");
              }
              workMinutes.innerHTML = workSession + "m";
          }else if(workBtnData == "+" && workMinutesVal < 60){
            workSession = workMinutesVal + 5;
              if(workSession < 10){
                clockTime.innerHTML = [zero + workSession, seconds].join(":");
              }else{
                clockTime.innerHTML = [workSession, seconds].join(":");
              }
            workMinutes.innerHTML = workSession  + "m";
          }else if(breakBtnData == "-" && breakMinutesVal > 0){
            breakSession = breakMinutesVal - 5;
            breakMinutes.innerHTML = breakSession  + "m";
          }else if(breakBtnData == "+" && breakMinutesVal < 30){
            breakSession = breakMinutesVal + 5;
            breakMinutes.innerHTML = breakSession  + "m";
          }
      });
   }

    // reset work time
    workTimeReset.addEventListener("click", function(e){
      workMinutes.innerHTML = 25 + "m";
    });
    // reset break time
    breakTimeReset.addEventListener("click", function(e){
      breakMinutes.innerHTML = 5 + "m";
    });
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



  // run clock
  function countdown(){
          /*minutes = (workSession % 60);*/
          /*seconds = 60;*/

        if(seconds > 0){
          seconds--;
          console.log(seconds);
            // add another ziro to seconds
            if(seconds < 10){
              seconds = zero + seconds;
              clockTime.innerHTML = [minutes, seconds].join(":");
            }else{
              clockTime.innerHTML = [minutes, seconds].join(":");
            }
        }else if(minutes > 0){
          minutes--;
            // add another ziro to minutes
            if(minutes < 10){
              minutes = zero + minutes;
              clockTime.innerHTML = [minutes, seconds].join(":");
            }else{
              clockTime.innerHTML = [minutes, seconds].join(":");
            }
        }else{
          clearInterval(countTime);
        }
  }

  var countTime = setInterval(countdown, 1000);

  // canvas clock
  function clock(){
    var ctx = document.querySelector("#clock-canvas").getContext("2d");
    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;


        ctx.strokeStyle = "#fef8e7";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.fillStyle = "#ff7272";
        ctx.arc(canvasWidth / 2, canvasWidth / 2, 100, 0, 6.28, false);
        ctx.fill();
        ctx.stroke();
  }

  clock();

// add start pause and stop buttons
// make minutes to go down by one
