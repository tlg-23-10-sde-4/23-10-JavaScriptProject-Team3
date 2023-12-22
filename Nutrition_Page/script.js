1; // Function to fetch Fitbit data

const bearPhrase1 = "eyJhbGciOiJIUzI1NiJ9.";

const bearPhrase2 =
  "eyJhdWQiOiIyM1JRVDYiLCJzdWIiOiJCVjRNSlIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNzAzMjYzMjI2LCJpYXQiOjE3MDMyMzQ0MjZ9.";

const bearPhrase3 = "Enin4JGRVCFFHJqdGhuhsa6iyKpqwanbdixRpwgQ3ss";
const bearPhrase4 = "";

let accessToken = bearPhrase1 + bearPhrase2 + bearPhrase3 + bearPhrase4;
// async function getAccessToken() {
//   const response = await fetch("https://api.fitbit.com/oauth2/token", {
//     method: "POST",
//     headers: {
//       Authorization:
//         "Basic " + btoa("23RQT6" + ":" + "0a9c4dac2911ec1b16d9500730e94a2f"),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=CALLBACK_URL",
//   });
//   const data = await response.json();
//   console.log(data);
//   accessToken = data.access_token;
// }

// async function refreshAccessToken(refreshToken) {
//   const response = await fetch("https://api.fitbit.com/oauth2/token", {
//     method: "POST",
//     headers: {
//       Authorization:
//         "Basic " + btoa("23RQT6" + ":" + "0a9c4dac2911ec1b16d9500730e94a2f"),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.status}`);
//   }

//   const data = await response.json();
//   return data.access_token;
// }

// Call getAccessToken before you call getNutrientData
// getAccessToken().then(() => getNutrientData());
async function getNutrientData(a) {
  let nutrientData = 0;
  try {
    const response = await fetch(
      `https://api.fitbit.com/1/foods/search.json?query=${a}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }
    nutrientData = await response.json();
    console.log(nutrientData);

    // Update the doughnut chart with new nutrient data
    //updateWaterChart(nutrientData);
  } catch (error) {
    console.error("Error fetching nutrient data:", error);
  }
  return nutrientData;
}

2;
// Declare a global variable to store the nutrient data
let nutrientDataGlobal = [];

function populateNutrientDataGlobal() {
  nutrientDataGlobal.push(getNutrientData());
  console.log(nutrientDataGlobal[0].foods[0].foods[0]);
}

async function addNutrInfo(startDate, endDate) {
  try {
    // Fetch the nutrient data
    const nutrientData = await getNutrientData(startDate, endDate);

    // Check if nutrientData is not empty
    if (nutrientData && nutrientData.length > 0) {
      // Store the nutrient data in the global variable
      nutrientDataGlobal = nutrientData;

      // Extract the required information
      const foodName = nutrientData[0].foodName;
      const servingSize = nutrientData[0].servingSize;
      const calories = nutrientData[0].calories;
      const totalCarbohydrate = nutrientData[0].totalCarbohydrate;
      const totalFat = nutrientData[0].totalFat;
      const protein = nutrientData[0].protein;

      // Display the information
      document.querySelector("#foodName").textContent = foodName;
      document.querySelector("#servingSize").textContent = servingSize;
      document.querySelector("#calories").textContent = calories;
      document.querySelector("#totalCarbohydrate").textContent =
        totalCarbohydrate;
      document.querySelector("#totalFat").textContent = totalFat;
      document.querySelector("#protein").textContent = protein;

      // Call the submitMeal function to log the nutrient data
      submitMeal(
        foodName,
        servingSize,
        calories,
        totalCarbohydrate,
        totalFat,
        protein
      );
    } else {
      console.error("No nutrient data found for the specified date range.");
    }
  } catch (error) {
    console.error("Error in addNutrInfo:", error);
  }
}

// Add event listener to the image elements
function submitMeal() {
  document.querySelectorAll(".meal-type-image").forEach((image) => {
    image.addEventListener("click", async () => {
      // Set the meal type based on the image clicked
      const mealType = image.dataset.mealType;

      // Prompt the user for the date
      const date = prompt("Please enter the date (YYYY-MM-DD):");

      // Prompt the user for the food item
      const foodItem = prompt("Please enter the food item:");

      // Fetch the nutrient data for the food item
      const nutrientData = await getNutrientData(foodItem);

      // Filter the nutrient data to get the data for the food item
      const foodItemData = nutrientDataGlobal.find(
        (data) => data.foodName === foodItem
      );

      // Check if the food item was found
      if (foodItemData) {
        // Add the nutrient data to the user's meal history
        addNutrInfo(foodItemData);
      } else {
        alert("Food item not found.");
      }
    });
  });

  // Add event listener to the submit button
  document.querySelector("#submit-button").addEventListener("click", () => {
    // Log the food entry into the user's meal history
    updateMealHistoryAndCalorieIntake(nutrientDataGlobal);
  });
}
function updateMealHistoryAndCalorieIntake(nutrientDataGlobal) {
  // Update the user's meal history
  const mealHistory = document.querySelector("#meal-history");
  const cal = nutrientDataGlobal[0].foods[0].calories;
  console.log(cal);
  nutrientDataGlobal.forEach((meal) => {
    const mealItem = document.createElement("li");
    mealItem.textContent = `${meal.foodName} - ${meal.calories} calories`;
    mealHistory.appendChild(mealItem);
  });

  // Update the user's calorie tracking
  const totalCalories = nutrientDataGlobal.reduce(
    (total, meal) => total + meal.calories,
    0
  );
  document.querySelector("#total-calories").textContent = totalCalories;
}

function updateCharts(nutrientDataGlobal) {
  // Calculate the total calories
  const totalCalories = nutrientDataGlobal.reduce(
    (total, meal) => total + meal.calories,
    0
  );

  // Calculate the total carbs, fat, and protein
  const totalCarbs = nutrientDataGlobal.reduce(
    (total, meal) => total + meal.totalCarborhydrate,
    0
  );
  const totalFat = nutrientDataGlobal.reduce(
    (total, meal) => total + meal.totalFat,
    0
  );
  const totalProtein = nutrientDataGlobal.reduce(
    (total, meal) => total + meal.protein,
    0
  );

  // Update the doughnut chart for calorie tracking
  const calorieChartCtx = document
    .getElementById("calorie-chart")
    .getContext("2d");
  new Chart(calorieChartCtx, {
    type: "doughnut",
    data: {
      labels: ["Consumed", "Remaining"],
      datasets: [
        {
          data: [totalCalories, userCalorieGoal - totalCalories],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color of the tooltip
        titleFontColor: "#fff", // Color of the tooltip title
        titleFontSize: 16, // Size of the tooltip title
        bodyFontColor: "#fff", // Color of the tooltip body
        bodyFontSize: 14, // Size of the tooltip body
        borderColor: "#fff", // Color of the tooltip border
        borderWidth: 1, // Size of the tooltip border
        cornerRadius: 5, // Radius of the tooltip corners
      },

      title: {
        display: true,
        text: "Calorie Tracker",
      },
    },
  });

  // Update the pie chart for macro-nutrient tracking
  const nutrientChartCtx = document
    .getElementById("nutrient-chart")
    .getContext("2d");
  new Chart(nutrientChartCtx, {
    type: "pie",
    data: {
      labels: ["Carbs", "Fat", "Protein"],
      datasets: [
        {
          data: [totalCarbs, totalFat, totalProtein],
          backgroundColor: [
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color of the tooltip
        titleFontColor: "#fff", // Color of the tooltip title
        titleFontSize: 16, // Size of the tooltip title
        bodyFontColor: "#fff", // Color of the tooltip body
        bodyFontSize: 14, // Size of the tooltip body
        borderColor: "#fff", // Color of the tooltip border
        borderWidth: 1, // Size of the tooltip border
        cornerRadius: 5, // Radius of the tooltip corners
      },
      title: {
        display: true,
        text: "Macro-Nutrient Tracker",
      },
    },
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const waterwheelContainer = document.querySelector(".waterwheel-container");
  if (waterwheelContainer) {
    waterwheelContainer.style.width = "25vw";
  }
});

let totalWaterIntake = 0;

function addWater(inputId) {
  const waterInput = document.getElementById(inputId);
  if (!waterInput) {
    console.error(`Element with ID "${inputId}" not found.`);
    return;
  }

  const waterAmount = parseInt(waterInput.value, 10);

  if (isNaN(waterAmount) || waterAmount <= 0) {
    alert("Please enter a valid water intake amount.");
    return;
  }

  totalWaterIntake += waterAmount;
  updateTotalWater("totalWater");
  updateWaterChart("myChart", 2000);
  waterInput.value = "";
}

function updateTotalWater(displayId) {
  const totalWaterElement = document.getElementById(displayId);
  if (totalWaterElement) {
    totalWaterElement.textContent = totalWaterIntake;
  } else {
    console.error(`Element with ID "${displayId}" not found.`);
  }
}

function updateWaterChart(chartId, dailyCalorieGoal) {
  const myChart = document.getElementById(chartId);
  if (!myChart) {
    console.error(`Element with ID "${chartId}" not found.`);
    return;
  }

  // Extract relevant nutrient information from nutrientData
  const caloriesConsumed = nutrientDataGlobal.summary.calories;
  const remainingCalories = dailyCalorieGoal - caloriesConsumed;

  // Update doughnut chart data
  doughnutData.datasets[0].data = [caloriesConsumed, remainingCalories];

  // Update the doughnut chart
  myChart.update();
}

let dailyCalorieGoal;
let dailyWaterIntakeGoal;

function setGoals() {
  dailyCalorieGoal = parseInt(prompt("Please enter your daily calorie goal:"));
  dailyWaterIntakeGoal = parseInt(
    prompt("Please enter your daily water intake goal (in glasses):")
  );

  // Check if the inputs are valid numbers
  if (isNaN(dailyCalorieGoal) || dailyCalorieGoal <= 0) {
    alert("Please enter a valid daily calorie goal.");
    dailyCalorieGoal = undefined;
  }

  if (isNaN(dailyWaterIntakeGoal) || dailyWaterIntakeGoal <= 0) {
    alert("Please enter a valid daily water intake goal.");
    dailyWaterIntakeGoal = undefined;
  }
}
