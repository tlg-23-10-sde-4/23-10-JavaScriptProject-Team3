// Global variables
// Most should eventually be pulled from the API or the server
const sleepGoal = 7;
const timeNow = new Date();
const todayMonth = timeNow.getMonth()+1;
const todayDate = timeNow.getDate();
const arrHoursSleep = [5.5, 6.9, 6.13, 7.4, 7.3, 4.67, 5.67]
const average = array => array.reduce((a, b) => a + b) / array.length;
const avgHrsSleep = average(arrHoursSleep);

// function that shows sleep time based on sleep schedule and phone usage

// function where icon plays audio when clicked

// Displaying the average hours of sleep over the past week
const pointerAvgSleep = document.getElementById("averageSleep")
pointerAvgSleep.textContent = `You averaged ${avgHrsSleep.toFixed(2)} hours of sleep over the past week`

//3-dot functionality usage order of operations


// graph of sleep time over past 7 days
const ctx = document.getElementById("sleepChart");

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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

//function to enter sleep data manually