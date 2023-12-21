// Meal Entry Section
let currentGraph = "doughnut"; // Initial graph

// Doughnut chart data
let doughnutData = {
  labels: ["Daily Caloric Amount:", "Calorie Intake:", "Remaining:"],
  datasets: [
    {
      data: [500, 300, 200],
      backgroundColor: [
        "rgb(42, 72,73)",
        "rgb(246, 125,60)",
        "rgb(188, 188, 188)",
      ],
    },
  ],
};

// Pie chart data
const pieData = {
  labels: doughnutData.labels,
  datasets: [
    {
      data: [500, 300, 200],
      backgroundColor: [
        "rgb(42, 72,73)",
        "rgb(246, 125,60)",
        "rgb(188, 188, 188)",
      ],
      hoverOffset: 4,
    },
  ],
};

// Get canvas element
const ctx = document.getElementById("mychart").getContext("2d");

// Create initial doughnut chart
let myChart = new Chart(ctx, {
  type: "doughnut",
  data: doughnutData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

function toggleGraph() {
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

function setMealType(mealType) {
  const mealTypeElement = document.getElementById("mealType");
  mealTypeElement.textContent = `Meal Type: ${mealType}`;
}

function showUserInputForm() {
  const userInputForm = document.getElementById("userInputForm");
  userInputForm.style.display = "block";
}

// Function to open the meal input popup
function openAndSubmitMeal(mealType) {
  // Set the meal type in the alert
  alert(`Meal Type: ${mealType}`);

  // Prompt the user for additional data
  const time = window.prompt("Enter Time:") || "";
  const foodItem = window.prompt("Enter Food Item:") || "";
  const calories = window.prompt("Enter Calories:") || "";

  // Call the submitMeal function with entered data
  submitMeal(mealType, time, foodItem, calories);
}
// Malfunction in code where user input is not logged. Currently only able to properly submit meal input via the openAndSubmitMeal() function.
TODO: function submitMeal(mealType, time, foodItem, calories) {
  // Create a message with the meal information
  const message = `Meal Information:\n\nTime: ${time}\nFood Item: ${foodItem}\nCalories: ${calories}\n${mealType}`;

  // Log the message to the console
  console.log(message);

  // Display the message in the meal history container
  const mealHistoryContainer = document.querySelector(".meal-history");
  const newMealEntry = document.createElement("div");
  newMealEntry.textContent = message;
  mealHistoryContainer.appendChild(newMealEntry);

  updateCalorieIntake(calories);
}

//update  functionality of calorie logging to graph so that graph updates to new logged data
TODO: function updateCalorieIntake(calories) {
  doughnutData.datasets[0].data[1] += parseInt(calories); // Add the calories to the calorie intake
  doughnutData.datasets[0].data[2] -= parseInt(calories); // Subtract the calories from the remaining count

  // Update the doughnut chart
  myChart.update();
}

// Set chart and click handlers when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  updateDoughnutChart();
  // setImageClickHandlers();
});

// Water Intake Section
document.addEventListener("DOMContentLoaded", function () {
  var waterwheelContainer = document.querySelector(".waterwheel-container");
  waterwheelContainer.style.width = "25vw";
});
let totalWaterIntake = 0;

function addWater() {
  const waterInput = document.getElementById("waterInput");
  const waterAmount = parseInt(waterInput.value, 10);

  if (isNaN(waterAmount) || waterAmount <= 0) {
    alert("Please enter a valid water intake amount.");
    return;
  }

  totalWaterIntake += waterAmount;
  updateTotalWater();
  updateDoughnutChart();
  waterInput.value = "";
}

function updateTotalWater() {
  const totalWaterElement = document.getElementById("totalWater");
  totalWaterElement.textContent = totalWaterIntake;
}

function updateDoughnutChart() {
  const ctx = document.getElementById("waterChart").getContext("2d");
  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [totalWaterIntake, 2000 - totalWaterIntake], // Assuming a daily goal of 2000 mL
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    cutoutPercentage: 70,
  };

  if (window.myDoughnutChart) {
    window.myDoughnutChart.destroy();
  }

  window.myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  });
}
