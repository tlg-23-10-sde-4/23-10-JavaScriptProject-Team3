// Global variables
// Most should eventually be pulled from the API or the server
const sleepGoal = 7;
const timeNow = new Date();
const todayMonth = timeNow.getMonth()+1;
const todayDate = timeNow.getDate();
let todayYear = timeNow.getFullYear();
let arrHoursSleep = []
// const sleepData = {}
const avgHrsSleep = []
let iterator = 0;
let dateArrayInterval = 30;
const arrDates = fillDateArray(dateArrayInterval);
const bearPhrase1 = "eyJhbGciOiJIUzI1NiJ9."
const bearPhrase2 = "eyJhdWQiOiIyM1JRVDYiLCJzdWIiOiJCVjRNSlIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNzAzMjMzNzU4LCJpYXQiOjE3MDMyMDQ5NTh9."
const bearPhrase3 = "6wGhf-"
const bearPhrase4 = "3dd3vd37AgVpHqMS9srZvTbt9b9vu2UYbloQ0"

// Pointers to elements by id 
const pointerLogSleepBtn = document.getElementById("log_Sleep_Btn")
const ctx = document.getElementById("sleepChart");

// function to change chart view based on button clicked
chart_Interval_Container.addEventListener("click", (e) => {
  if (e.target.id === "day_Btn") {
    if (dateArrayInterval === 1) {
      return;
    }
    else {
    dateArrayInterval = 1;
    }
  }
  if (e.target.id === "week_Btn") {
    if (dateArrayInterval === 7) {
      return;
    }
    else {
    dateArrayInterval = 7;
    }
  }
  if (e.target.id === "month_Btn") {
    if (dateArrayInterval === 30) {
      return;
    }
    else {
    dateArrayInterval = 30;
    }
  }
  if (e.target.id === "100_Days_Btn") {
    if (dateArrayInterval === 100) {
      return;
    }
    else {
    dateArrayInterval = 100;
    }
  }
  getSleepData(dateArrayInterval);
})


//3-dot functionality usage order of operations

// Fetch function - won't reach into previous year
function getSleepData(dateArrayInterval) {
  const [startYear, startMonth, startDate] = setStartDates(arrDates[0]);
  const endDateFitbitFormat = `${todayYear}-${todayMonth}-${todayDate}`;
  const startDateFitbitFormat = `${startYear}-${startMonth}-${startDate}`;
  // console.log(`${startDateFitbitFormat} to ${endDateFitbitFormat}`);
  fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${startDateFitbitFormat}/${endDateFitbitFormat}.json`, {
    headers: {
      "Authorization": `Bearer ${bearPhrase1}${bearPhrase2}${bearPhrase3}${bearPhrase4}`
    }
  })
  .then((res) => res.json()) 
  .then((sleepData) => {
    console.log(sleepData);
    arrHoursSleep = fillSleepArray(sleepData);
  })
  .then(() => {
    // graph of sleep time over past dateArrayInterval days
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: arrDates,
        datasets: [
          {
            label: "Hours of Sleep",
            data: arrHoursSleep,
            borderWidth: 1,
            backgroundColor: "#6f9283"
          }, 
          {
            type: "line",
            label: "Sleep Goal",
            data: sleepGoalPopulate(dateArrayInterval),
            backgroundColor: "#222e50",
            pointHitRadius: 15,
            pointHoverRadius: 10,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .catch()
}

getSleepData(dateArrayInterval);
// pushSleepData();




//function to enter sleep data manually
log_Sleep_Form.addEventListener("click", (e) => {
  // e.preventDefault();
  if (classHidden.style.display === "none") {
    classHidden.style.display = "block";
  } else {
    classHidden.style.display = "none"
  }
})

log_Sleep_Submit.addEventListener("submit", (e) => {
  // Need to separate the date and time out of newSleepDate
  const newSleepDate = e.target.parent.children[0].children[0].children[0].value;
  const newSleepDurationHrs = e.target.parent.children[0].children[1].children[0].value;
  const newSleepDurationMins = newSleepDurationHrs * 60;
  fetch ("https://api.fitbit.com/1.2/user/-/sleep.json?date=`${newSleepDate}`startTime=`${newSleepStartTime}`&duration=`${newSleepDurationMillis}`&")

})


// function to calculate average hours of sleep over the past week
function calculateAvgSleep(array) {
  const average = array => array.reduce((a, b) => a + b) / array.length;
  const avgHrsSleep = average(arrHoursSleep);
}

// Function to fill array with last dateArrayInterval days
// For use in the chart
function fillDateArray(dateArrayInterval) {
  let thisArray = [];
  let currentTimeStamp = new Date();
  let thisDate = currentTimeStamp.getDate();
  let thisMonth = currentTimeStamp.getMonth()+1;
  thisArray.push(`${thisMonth}/${thisDate}`);
  for (let i = 1; i < (dateArrayInterval); i++) {
    dayBefore = thisDate - 1
    thisDate = currentTimeStamp.setDate(dayBefore);
    thisDate = currentTimeStamp.getDate();
    thisMonth = currentTimeStamp.getMonth()+1;
    thisArray.push(`${thisMonth}/${thisDate}`);
  }
  thisArray.reverse();
  console.log(thisArray);
  // thisArray.forEach((date) => console.log(`${date}, `));
  return thisArray;
}

function checkToChangeYear() {  // Will add leap year functionality later
  if ((dateArrayInterval >= 100 && todayMonth === 4 && todayDate <= 11)
      || (dateArrayInterval >= 100 && todayMonth < 4) 
      || (dateArrayInterval ===30 && todayMonth === 1 && todayDate <= 29) 
      || (dateArrayInterval ===7 && todayMonth === 1 && todayDate <= 6)) {
    return todayYear - 1;
    }
    else {
      return todayYear;
  }
}

function appendLeadingZero(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}

// Basically sets dates from the format MM/DD to YYYY-MM-DD
function setStartDates(a) {
  let startDate = a.split("/")[1];
  startDate = appendLeadingZero(startDate);
  let startMonth = a.split("/")[0];
  startMonth = appendLeadingZero(startMonth);
  const startYear = checkToChangeYear();
  return [startYear, startMonth, startDate];
}

// Use this function to fill arrHoursSleep with hours of sleep over the past interval time. Importantly, it needs to push 0 for any day that doesn't have data
function fillSleepArray(obj) {
  let iterator = 0;
  // let arrayA = fillDateArray(dateArrayInterval);
  let arrayB = [];
  for (let elt of arrDates) { 
    const [a, b, c] = setStartDates(elt);
    const YYYYMMDD = `${a}-${b}-${c}`;
    let pushedSleep = false;
    for (let i=0; i < obj.sleep.length; i++) {
      if (obj.sleep[i].dateOfSleep === YYYYMMDD) {
        arrayB.push(obj.sleep[i].minutesAsleep/60);
        pushedSleep = true;
      }
    }
    if (pushedSleep === false) {
      arrayB.push(0);
    }
  }
  // console.log(`arrayB: ${arrayB}`);
  return arrayB;
}

function sleepGoalPopulate(a) {
  const b = []
  for (let i=0; i < a; i++) {
    b.push(sleepGoal);
  }
}