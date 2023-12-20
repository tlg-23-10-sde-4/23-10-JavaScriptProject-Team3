// Global variables
// Most should eventually be pulled from the API or the server
const activityGoal = 30;
const rightNow = new Date();
let thisMonth = rightNow.getMonth()+1;  // Currently returning UTC
let thisDay = rightNow.getDate();       // Currently returning UTC
const arrMinsWorkingOut = [64, 22, 103, 0, 19, 24, 31]
const average = array => array.reduce((a, b) => a + b) / array.length;
const avgMinsWorkingOut = average(arrMinsWorkingOut);
const arrLastSevenDays = fillDateArray();

//create a tracker bar
const ctx = document.getElementById("workoutChart");

new Chart(ctx, {
  type: "bar",
  data: {

    labels: [arrLastSevenDays[0], arrLastSevenDays[1], arrLastSevenDays[2], arrLastSevenDays[3], arrLastSevenDays[4], arrLastSevenDays[5], arrLastSevenDays[6]],
    

    datasets: [
      {
        label: "Minutes of Activities",
        data: arrMinsWorkingOut,
        borderWidth: 1,
        backgroundColor: "#6f9283"
      }, 
      {
        type: "line",
        label: "Activity Goal",
        data: [activityGoal, activityGoal, activityGoal, activityGoal, activityGoal, activityGoal, activityGoal],
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

//3-dot icon setting setup configuration


//quick-start exercise 



//input a timer here function here


//exercise and calories burned history

// Other functions


function fillDateArray() {
    let thisArray = []
    let switched = false;
    let newDay = thisDay;
    for (let i = 0; i < 7; i++) {
        newDay = thisDay - i;
            if (newDay < 1) { 
                switch (thisMonth) {
                    // date.getMonth returns 0 for January, so this is March
                    case (3):
                        // ignoring leap years for now
                        // The program will break for a day every 4 years. That's 99.999% uptime
                        thisMonth = 2;
                        thisDay = newDay = 28;
                        thisDay = thisDay + i;
                        break;
                    // The months where the month before has 30 days
                    case (5): 
                    case (7): 
                    case (10): 
                    case (12): 
                        thisMonth = thisMonth - 1;
                        thisDay = newDay = 30;
                        thisDay = thisDay + i;
                        break;
                    // The months where the month before has 31 days
                    case (2): 
                    case (4): 
                    case (6): 
                    case (8): 
                    case (9): 
                    case (11):
                        thisMonth = thisMonth -1;
                        thisDay = newDay = 31;
                        thisDay = thisDay + i;
                        break;
                    // If it's January, go to December
                    case (1):
                        thisMonth = 12;
                        thisDay = newDay = 31;
                        thisDay = thisDay + i;
                        break;
                }
            }
            thisArray.push(`${thisMonth}/${newDay}`);
        }
        thisArray.reverse();
        return thisArray;
}