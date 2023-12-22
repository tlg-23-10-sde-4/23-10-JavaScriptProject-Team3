document.addEventListener('DOMContentLoaded', function () {
  // Example: Add an event listener for a button click
  const myButton = document.getElementById('myButton');
  if (myButton) {
    myButton.addEventListener('click', function () {
      alert('Button clicked!');
    });
  }

  // Example: Make an AJAX request using Fetch API
  const fetchDataButton = document.getElementById('fetchDataButton');
  const dataContainer = document.getElementById('dataContainer');

  if (fetchDataButton && dataContainer) {
    fetchDataButton.addEventListener('click', async function () {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch('/api/data');
        const data = await response.json();

        // Display the fetched data in the container
        dataContainer.innerHTML = JSON.stringify(data, null, 2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  }
});
// handle listening for the button clicks

document.querySelector('.weight_or_bmi').addEventListener('click', (event) => {
  if (event.target.value === 'weight') {
    getWeightData();
  } else {
    getBMIForWeek();
  }
});