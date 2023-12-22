//This one has API functionality(not yet tested)

//GET REQUEST
async function getNutritionData(accessToken) {
  const response = await fetch(
    "https://api.fitbit.com/1/user/-/foods/log/date/today.json",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

//POST REQUEST
async function logNutritionData(accessToken, nutritionData) {
  const response = await fetch(
    "https://api.fitbit.com/1/user/-/foods/log.json",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nutritionData),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

//DELETE REQUEST
async function deleteNutritionLog(accessToken, logId) {
  const response = await fetch(
    `https://api.fitbit.com/1/user/-/foods/log/${logId}.json`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// UPDATE REQUEST
async function updateNutritionLog(accessToken, logId, updatedNutritionData) {
  const response = await fetch(
    `https://api.fitbit.com/1/user/-/foods/log/${logId}.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNutritionData),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
//GET REQUEST FOR DATE RANGE
async function getNutrientData(startDate, endDate) {
  try {
    const response = await fetch(
      `https://api.fitbit.com/1/user/-/foods/log/date/${startDate}/${endDate}.json`,
      {
        headers: {
          //add token
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const nutrientData = await response.json();
      console.log(nutrientData);

      // Update the doughnut chart with new nutrient data
      updateDoughnutChart(nutrientData);

      // Add logic to update other elements on the page with the obtained nutrient data
      //...what else must be updated?
      displayCaloriesConsumed(nutrientData);
      updateFoodList(nutrientData);
    } else {
      console.error("Error fetching nutrient data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching nutrient data:", error);
  }
}

// GET REQUEST FOR SPECIFIC DATE
async function getNutritionDataForDate(accessToken, date) {
  const response = await fetch(
    `https://api.fitbit.com/1/user/-/foods/log/date/${date}.json`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// GET REQUEST FOR SPECIFIC DATE WITH PAGINATION AND ERROR HANDLING
async function getNutritionDataForDate(
  accessToken,
  date,
  pageNumber = 1,
  retries = 3
) {
  try {
    const response = await fetch(
      `https://api.fitbit.com/1/user/-/foods/log/date/${date}.json?page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // If there are more pages, fetch them recursively
    if (data.pagination && data.pagination.next) {
      const nextPageNumber = pageNumber + 1;
      const nextPageData = await getNutritionDataForDate(
        accessToken,
        date,
        nextPageNumber
      );

      // Combine the data from the current page and the next page
      data.logs = [...data.logs, ...nextPageData.logs];
    }

    return data;
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    // Wait for a while before retrying the request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return getNutritionDataForDate(accessToken, date, pageNumber, retries - 1);
  }
}
