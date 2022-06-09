const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime;
let isAlarmSet;
let ringtone = new Audio("../sound/ringtone.mp3");

for(let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value= "${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  // getting hour, mins, secs
  let data = new Date();
  let h = data.getHours();
  let m = data.getMinutes();
  let s = data.getSeconds();
  ampm = "AM";

  if(h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  // if hour value is 0, set this value to 12
  h = h == 0 ? h = 12 : h;
  // adding 0 before hr, min sec if this value is less then 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`;

  if(alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

function setAlarm() {
  // if isAlarmSet is true
  if(isAlarmSet) {
    alarmTime = ""; // clear the value of alarmTime
    ringtone.pause(); // pause the ringtone
    content.classList.remove("disable");
    setAlarmBtn.style.backgroundColor = "#4a98f7";
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false; // return isAlarmSet value to false
  }

  // getting hour, minute, am-pm select tag value
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  
  if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    return alert("Please, Select a valid time to set Alarm!");
  }

  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.style.backgroundColor = "#f44336";
  setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);