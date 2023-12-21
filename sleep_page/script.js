// Global variables
// Most should eventually be pulled from the API or the server
const sleepGoal = 7;
const timeNow = new Date();
const todayMonth = timeNow.getMonth()+1;
const todayDate = timeNow.getDate();
const arrHoursSleep = []
const sleepData = {}
const avgHrsSleep = []
const ctx = document.getElementById("sleepChart");
let iterator = 0;

// function that shows sleep time based on sleep schedule and phone usage

// function where icon plays audio when clicked

// Displaying the average hours of sleep over the past week
const pointerAvgSleep = document.getElementById("averageSleep")
// pointerAvgSleep.textContent = `You averaged ${avgHrsSleep.toFixed(2)} hours of sleep over the past week`

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
    // console.log(arrHoursSleep);
  })
  .then(() => {
    new Chart(ctx, {
      type: "bar",
      data: {
        // Eventually need to change the labels here
        // Will display odd values during the first 6 days of the month
        labels: [   `${todayMonth}/${todayDate-6}`, 
                    `${todayMonth}/${todayDate-5}`, 
                    `${todayMonth}/${todayDate-4}`, 
                    `${todayMonth}/${todayDate-3}`, 
                    `${todayMonth}/${todayDate-2}`, 
                    `${todayMonth}/${todayDate-1}`, 
                    `${todayMonth}/${todayDate}`],
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

// graph of sleep time over past 7 days




//function to enter sleep data manually

// function to calculate average hours of sleep over the past week
function calculateAvgSleep(array) {
  const average = array => array.reduce((a, b) => a + b) / array.length;
  const avgHrsSleep = average(arrHoursSleep);
}