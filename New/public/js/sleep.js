// Global variables
// Most should eventually be pulled from the API or the server
const sleepGoal = 7;
let timeNow = new Date();
const todayMonth = timeNow.getMonth()+1;
const todayDate = timeNow.getDate();
const arrHoursSleep = []
const sleepData = {}
const avgHrsSleep = []

let iterator = 0;
let dateArrayInterval = 7;
const arrLastSevenDays = fillDateArray(dateArrayInterval);

// Pointers to elements by id 
const pointerLogSleepBtn = document.getElementById("log_Sleep_Btn")

const ctx = document.getElementById("sleepChart");

// function that shows sleep time based on sleep schedule and phone usage

// function where icon plays audio when clicked




//3-dot functionality usage order of operations

// Fetch function
function getFitnessData() {
  fetch("https://api.fitbit.com/1.2/user/-/sleep/date/2023-12-14/2023-12-20.json", {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JRVDYiLCJzdWIiOiJCVjRNSlIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNzAzMTM3NzQwLCJpYXQiOjE3MDMxMDg5NDB9.-iR97wccsOb_MTMT3disKdsqYFCFp58cjt0SvrZNZOc"
    }
  })
  .then((res) => res.json()) 
  .then((sleepData) => {
    // console.log(sleepData);
    for (let elt of sleepData.sleep) {
      arrHoursSleep.push(`${(sleepData.sleep[iterator].minutesAsleep)/60}`)
      console.log((sleepData.sleep[iterator].minutesAsleep) / 60)
      iterator++
    }
  })
  .then(() => {
    // graph of sleep time over past 7 days
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [ arrLastSevenDays[0], 
                  arrLastSevenDays[1], 
                  arrLastSevenDays[2], 
                  arrLastSevenDays[3], 
                  arrLastSevenDays[4], 
                  arrLastSevenDays[5], 
                  arrLastSevenDays[6]],
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
            data: [sleepGoal, sleepGoal, sleepGoal, sleepGoal, sleepGoal, sleepGoal, sleepGoal],
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

getFitnessData();




//function to enter sleep data manually
const classHidden = document.getElementById("log_Sleep_Form")

pointerLogSleepBtn.addEventListener("click", (e) => {
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

// Function to fill array with last 7 days
// For use in the chart
function fillDateArray(interval) {
  let thisArray = [];
  let thisDate = timeNow.getDate();
  let thisMonth = timeNow.getMonth()+1;
  thisArray.push(`${thisMonth}/${thisDate}`);
  for (let i = 0; i < (interval-1); i++) {
    dayBefore = thisDate - 1
    thisDate = timeNow.setDate(dayBefore);
    thisDate = timeNow.getDate();
    thisMonth = timeNow.getMonth()+1;
    thisArray.push(`${thisMonth}/${thisDate}`);
  }
  thisArray.reverse();
  return thisArray;
}