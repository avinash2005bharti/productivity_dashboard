/* -----------------------------------

1.Basic functinality functions

--------------------------------------
 */

function openFeatures() {
    var allElems = document.querySelectorAll('.elem');
    var fullElems = document.querySelectorAll('.fullElems');

    // optional: sabko hide kardo initially
    fullElems.forEach(function(el) {
        el.style.display = 'none';
    });

    allElems.forEach(function(elem) {
        elem.addEventListener('click', function(e) {
            e.preventDefault();

            fullElems.forEach(function(el) {
                el.style.display = 'none';
            });

            fullElems[elem.id].style.display = 'block';
        });
    });

    var fullElemsBackbtn = document.querySelectorAll('.fullElems .back');
    fullElemsBackbtn.forEach(function(back) {
        back.addEventListener('click', function(e) {
            e.preventDefault();
            fullElems[back.id].style.display = 'none';
        });
    });
}
openFeatures();

/* -----------------------------------

2.Todo functions

--------------------------------------
 */

function todolist() {
    var form = document.querySelector('.addtask form');
    let taskinput = document.querySelector('.addtask form #task');
    let taskdetails = document.querySelector('.addtask form textarea');
    let taskcheckbox = document.querySelector('.addtask form #check');
    let alltask = document.querySelector('.alltask');

    let currentTask = JSON.parse(localStorage.getItem('currentTask')) || [];

    function rendertask() {
        let sum = '';
        currentTask.forEach(function(elem, idx) {
            sum += `
                <div class="task">
                    <h5>
                        ${elem.task}
                        <span class="${elem.imp ? 'important' : 'not-important'}">imp</span>
                    </h5>
                    <button type="button" id="${idx}">Mark as Completed</button>
                </div>
            `;
        });
        alltask.innerHTML = sum;

        var markcompletedbtn = document.querySelectorAll('.task button');
        markcompletedbtn.forEach(function(btn) {
            btn.addEventListener('click', function() {
                currentTask.splice(btn.id, 1);
                localStorage.setItem('currentTask', JSON.stringify(currentTask));
                rendertask();
            });
        });
    }

    rendertask();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        currentTask.push({
            task: taskinput.value,
            details: taskdetails.value,
            imp: taskcheckbox.checked
        });

        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        taskinput.value = '';
        taskdetails.value = '';
        taskcheckbox.checked = false;

        rendertask();
    });
}
todolist();

/* -----------------------------------

3.daily planner functions

--------------------------------------
 */

function dailyplanner() {
    var hours = Array.from({ length: 24 }, (_, idx) => `${idx}:00-${idx + 1}:00`);
    var wholedaysum = '';

    var dayplandata = JSON.parse(localStorage.getItem('dayplandata')) || {};

    hours.forEach(function(elem, idx) {
        var savedData = dayplandata[idx] || '';
        wholedaysum += `
            <div class="dayplannertime">
                <p>${elem}</p>
                <input id="${idx}" type="text" placeholder="----" value="${savedData}">
            </div>
        `;
    });

    let dayplanner = document.querySelector('.dayplanner');
    dayplanner.innerHTML = wholedaysum;

    var DayplannerInput = document.querySelectorAll('.dayplanner input');
    DayplannerInput.forEach(function(elem) {
        elem.addEventListener('input', function() {
            dayplandata[elem.id] = elem.value;
            localStorage.setItem('dayplandata', JSON.stringify(dayplandata));
        });
    });
}
dailyplanner();

/* -----------------------------------

4.motivational functions

--------------------------------------
 */
function motivational(){
    var motivationquote= document.querySelector('.motivationwrapper p i')
var motivationauthor= document.querySelector('.motivationwrapper span b')

async function fetchquote() {
    let response = await fetch('https://api.quotable.io/random');
     let data = await response.json();
     motivationquote.innerHTML = data.content;
     motivationauthor.innerHTML = "- " + data.author;
    
}

fetchquote()
}
motivational()

/* -----------------------------------

5.Pomodomo functions 

--------------------------------------
 */


function timerfull(){
    var timer = document.querySelector('.pomotimer h1');
var startbtn = document.querySelector('.pomotimer .start')
var pausebtn = document.querySelector('.pomotimer .pause')
var resetbtn = document.querySelector('.pomotimer .reset')
var session = document.querySelector('.pomodorofullpage .session')
let timerinterval = null
var totalsec = 25*60;


    function updatetime(){
        let minutes = Math.floor(totalsec/60);
        let sec = totalsec%60
        timer.innerHTML=`${String(minutes).padStart('2',0)}:${String(sec).padStart('2',0)}`
    }
updatetime();


function starttimer(){
     clearInterval(timerinterval)
   timerinterval = setInterval(function(){
        if(totalsec==0) 
            {
                session.innerHTML='Take a Break';
                session.style.backgroundColor='var(--blue)'
            }
        if(totalsec > 0){
        totalsec--;
        updatetime();
    }
    },1000)
}
function pause(){
   clearInterval(timerinterval)
}
startbtn.addEventListener('click',starttimer)
pausebtn.addEventListener('click',pause)

function reset(){
    totalsec = 25*60;
    updatetime()
   pause()
   session.innerHTML='Work Session';
   session.style.backgroundColor='var(--green)'
}
resetbtn.addEventListener('click',reset)
}
timerfull()

/* -----------------------------------

6.   front page ui header

--------------------------------------
 */
function ui(){var apiKey = 'dd82563a9c504bd397f172339260504'
var city= 'Bhopal'
var data = null
var cty = document.querySelector('#city')
var temp = document.querySelector('.header2 h2')
var typ = document.querySelector('.header2 h4')
var Precipitation = document.querySelector('#Precipitation')
var Humidity = document.querySelector('#Humidity')
var wind = document.querySelector('#wind')
async function weatherapicall(){
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
     data = await response.json()
     temp.innerHTML=`${data.current.temp_c}°C`
     typ.innerHTML=`${data.current.condition.text}`
     cty.innerHTML=`${data.location.name} (${data.location.region})`
     Precipitation.innerHTML=`Precipitation:${data.current.precip_mm} mm`
     Humidity.innerHTML=`Humidity:${data.current.humidity}%`
     wind.innerHTML=`wind:${data.current.wind_kph} km/h`
    console.log(data)
}

weatherapicall()

var datetime = document.querySelector('.header1 h1')
var fullyear = document.querySelector('#year')

function date_time() {
   const daysweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

   const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ]

   let date = new Date()
   let day = daysweek[date.getDay()]
   let dte = date.getDate()
   let month = monthNames[date.getMonth()]
   let year = date.getFullYear()

   let hours = date.getHours()
   let minutes = String(date.getMinutes()).padStart(2, '0')
   let seconds = String(date.getSeconds()).padStart(2, '0')

   let period = hours >= 12 ? 'PM' : 'AM'
   hours = hours % 12 || 12

   fullyear.innerHTML = `${dte} ${month} ${year}`
   datetime.innerHTML = `${day}, ${hours}:${minutes}:${seconds} ${period}`
}

date_time()
setInterval(date_time, 1000)}
ui()
