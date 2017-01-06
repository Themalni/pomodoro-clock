var workMinutes = document.querySelector(".settings__time-work .settings__time-digits");
var breakMinutes = document.querySelector(".settings__time-break .settings__time-digits");
var substract = document.querySelector(".settings__time-break .settings__time-substract");
var add = document.querySelector(".settings__time-break .settings__time-add");
var button = document.querySelector(".settings__time-button");

workMinutes.innerHTML = 25;
breakMinutes.innerHTML = 5;


function changeBreak(e){
  var breakMinutesVal = parseInt(breakMinutes.textContent);

      if(substract && breakMinutesVal < 60){
        var changeTime = breakMinutesVal + 5;
        breakMinutes.innerHTML = changeTime;
      }else{
        if(breakMinutesVal > 0){
          var changeTime = breakMinutesVal - 5;
          breakMinutes.innerHTML = changeTime;
        }else{
          changeTime = 0;
        }

    }
}
button.addEventListener("click", changeBreak);

// check what causing toggle on minus
// set buttons to this
