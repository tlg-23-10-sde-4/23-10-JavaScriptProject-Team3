document.addEventListener('DOMContentLoaded', function () {
  const addWeightForm = document.getElementById('addWeightForm'); // Assuming you have a form with this ID

  if (addWeightForm) {
    addWeightForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const weightInput = document.getElementById('addWeight');
      const weight = weightInput.value;

      try {
        // Assuming you are using fetch to make a POST request
        const response = await fetch('/bodycomp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Adjust the content type if needed
          },
          body: JSON.stringify({ weight }),
        });

        if (response.ok) {
          //TODO make this a toast notification
          console.log('Weight data submitted successfully');
          // You can optionally handle success, e.g., show a success message
        } else {
          console.error('Error submitting weight data:', response.statusText);
          // You can handle errors here, e.g., show an error message
        }
      } catch (error) {
        console.error('Error submitting weight data:', error);
        // You can handle errors here, e.g., show an error message
      }
    });
  }
});
