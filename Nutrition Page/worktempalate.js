//This one has API functionality(not yet tested)

nutrientDataList.addEventListener("click", async (e) => {
  if (e.target.matches(".delete")) {
    const id = e.target.dataset.id;
    const response = await fetch(`/api/nutrition/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete nutritient");
    }
  } else if (e.target.matches(".post")) {
    getNutrientData();
  }
});

// Function for adding a new Nutritional Information entry
async function addNutrInfo() {
  const inputs = [
    "#food-name",
    "#serving-size",
    "#calories",
    "#carbs",
    "#fat",
    "#protein",
  ];
  const values = inputs.map((input) =>
    parseFloat(document.querySelector(input).value).toFixed(2)
  );

  if (values.every((val) => !isNaN(val) && val >= 0)) {
    const response = await fetch("/api/nutrition", {
      method: "POST",
      body: JSON.stringify({
        food_name: values[0],
        serving_size: parseInt(values[1]),
        calories: values[2],
        carbohydrates: values[3],
        fat: values[4],
        protein: values[5],
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create nutritional information");
    }
  } else {
    alert(
      "Please fill out all fields and make sure the values are positive numbers."
    );
  }
}

// Event listener for submit button on Add Nutritional Info form
document.getElementById("add-info").addEventListener("submit", (event) => {
  event.preventDefault();
  addNutrInfo();
});

// Function to fetch Fitbit data
async function getNutrientData() {
  try {
    const response = await fetch(
      "https://api.fitbit.com/1/user/-/foods/log/date/2023-12-14/2023-12-20.json",
      {
        headers: {
          //add token
          Authorization: "Bearer <YOUR_FITBIT_ACCESS_TOKEN>",
        },
      }
    );

    if (response.ok) {
      const nutrientData = await response.json();
      console.log(nutrientData);

      // Update the doughnut chart with new nutrient data
      updateDoughnutChart(nutrientData);

      // Add logic to update other elements on the page with the obtained nutrient data
    } else {
      console.error("Error fetching nutrient data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching nutrient data:", error);
  }
}

// Function to submit meal data
function submitMeal(mealType, time, foodItem, calories) {
  const message = `Meal Information:\n\nTime: ${time}\nFood Item: ${foodItem}\nCalories: ${calories}\n${mealType}`;
  console.log(message);

  // Display the message in the meal history container
  const mealHistoryContainer = document.querySelector(".meal-history");
  const newMealEntry = document.createElement("div");
  newMealEntry.textContent = message;
  mealHistoryContainer.appendChild(newMealEntry);

  // Update calorie intake and fetch Fitbit data
  updateCalorieIntake(calories);
  getNutrientData();
}

// Call the function to fetch and display nutrient data
//   getNutrientData();

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

  // Update calorie intake and fetch Fitbit data
  updateCalorieIntake(calories);
  getNutrientData();
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
  // Extract relevant nutrient information from nutrientData
  const caloriesConsumed = nutrientData.summary.calories;
  const remainingCalories = 2000 - caloriesConsumed; // Assuming a daily goal of 2000 calories

  // Update doughnut chart data
  doughnutData.datasets[0].data = [caloriesConsumed, remainingCalories];

  // Update the doughnut chart
  myChart.update();
}
