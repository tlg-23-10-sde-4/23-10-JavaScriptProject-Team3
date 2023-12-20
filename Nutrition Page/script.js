// //Ari: daily calories burned graph
let currentGraph = "doughnut"; // Initial graph

const doughnutData = {
  labels: ["Daily Caloric Amount:", "Calorie Intake:", "Remaining:"],
  datasets: [
    {
      label: "Total Calorie",
      data: [1371, 216, 413],
      backgroundColor: [
        "rgb(42, 72,73)",
        "rgb(246, 125,60)",
        "rgb(188, 188, 188)",
      ],
      hoverOffset: 4,
    },
  ],
};

const pieData = {
  labels: doughnutData.labels,
  datasets: [
    {
      data: [500, 300, 200], // Different data for the pie chart
      backgroundColor: [
        "rgb(42, 72,73)",
        "rgb(246, 125,60)",
        "rgb(188, 188, 188)",
      ],
      hoverOffset: 4,
    },
  ],
};

const ctx = document.getElementById("mychart").getContext("2d");
let myChart = new Chart(ctx, {
  type: "doughnut",
  data: doughnutData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

function toggleGraph() {
  //Todo: add graph name header for each graph
  // Toggle between doughnut and pie charts
  if (currentGraph === "doughnut") {
    myChart.destroy(); // Destroy the current chart

    // Create a new pie chart
    myChart = new Chart(ctx, {
      type: "pie",
      data: pieData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    currentGraph = "pie"; // Update the current graph
  } else {
    myChart.destroy(); // Destroy the current chart

    // Create a new doughnut chart
    myChart = new Chart(ctx, {
      type: "doughnut",
      data: doughnutData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    currentGraph = "doughnut"; // Update the current graph
  }
}

// //add meal
// function openModal(mealtime) {
//   document.getElementById("mealTime").value = mealtime;
//   document.getElementById("modal").style.display = "block";
//   document.getElementById("overlay").style.display = "block";
// }

// function closeModal() {
//   document.getElementById("modal").style.display = "none";
//   document.getElementById("overlay").style.display = "none";
// }

// function addMeal() {
//   // Get values from the modal
//   const mealName = document.getElementById("mealName").value;
//   const calories = document.getElementById("calories").value;
//   const mealTime = document.getElementById("mealTime").value;

//   // Log the values to the console (you can replace this with your logic)
//   console.log("Meal Name: ", mealName);
//   console.log("Calories: ", calories);
//   console.log("Meal Time: ", mealTime);

//   // You can add your logic to store or display the meal information as needed

//   addMeal();
//   // Close the modal
//   closeModal();
// }

function addMeal(mealtime) {
  // Use prompt to get input from the user
  const mealName = prompt(`Enter meal name for ${mealtime}:`);
  const calories = prompt(`Enter calories for ${mealtime}:`);

  // Log the values to the console (you can replace this with your logic)
  console.log("Meal Name: ", mealName);
  console.log("Calories: ", calories);
  console.log("Meal Time: ", mealtime);

  // Display meal information on the page
  displayInfo("mealInfo", `${mealtime}: ${mealName} - ${calories} calories`);
}

function addWater() {
  // Use prompt to get input from the user
  const waterIntake = prompt("Enter water intake in milliliters:");

  // Log the value to the console (you can replace this with your logic)
  console.log("Water Intake: ", waterIntake);

  // Display water intake information on the page
  displayInfo("waterInfo", `Water Intake: ${waterIntake} ml`);
}

function displayInfo(containerId, info) {
  // Create a new div to display information
  const infoDiv = document.createElement("div");
  infoDiv.innerHTML = `<strong>${info}</strong>`;

  // Append the div to the specified container
  document.getElementById(containerId).appendChild(infoDiv);
}
