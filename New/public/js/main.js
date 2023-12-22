document.addEventListener('DOMContentLoaded', function () {
  const addWeightForm = document.getElementById('addWeightForm');

  if (addWeightForm) {
    addWeightForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      console.log("Clicked submit button")

      const weightInput = document.getElementById('addWeight');
      const weight = weightInput.value;

      try {
        const response = await fetch('/bodycomp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ weight }),
        });

        if (response.ok) {
          //TODO make this a toast notification
          console.log('Weight data submitted successfully');
          weightInput.textContent = '';
          window.location.reload();
        } else {
          console.error('Error submitting weight data:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting weight data:', error);
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const addFoodForm = document.getElementById('userInputForm');

  if (addFoodForm) {
    addFoodForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      console.log("Clicked submit button")

      const foodInput = document.getElementById('foodItem').value;
      const calories = document.getElementById('calories').value;
      const mealTypeId = document.getElementById('mealTypeId').value;
      const amount = document.getElementById('servingSize').value;

      try {
        const response = await fetch('/nutrition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ foodInput, calories, mealTypeId, amount }),
        });

        if (response.ok) {
          //TODO make this a toast notification
          console.log('Food data submitted successfully');
          foodInput.textContent = '';
          calories.textContent = '';
          mealTypeId.textContent = '';
          amount.textContent = '';
          window.location.reload();
        } else {
          console.error('Error submitting food data:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting food data:', error);
      }
    });
  }
});