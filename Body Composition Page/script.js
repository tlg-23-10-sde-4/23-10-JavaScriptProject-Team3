// your_script.js

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("bmi-chart");
  const day = new Date();
  const today = day.getDate();
  const month = day.getMonth() + 1;
  const data = [24, 24, 23, 23, 25, 23, 22]
  const threshold = 23;

  // Map through the data and set different colors based on the threshold
  const backgroundColors = data.map((value) =>
    value > threshold ? "rgba(255, 0, 0, 0.52)" : "rgba(0, 255, 0, 0.52)"
  );
  const borderColors = data.map((value) =>
    value > threshold ? "rgba(255, 0, 0, 1)" : "rgba(0, 99, 0, 1)"
  );

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        `${month}/${today - 6}`,
        `${month}/${today - 5}`,
        `${month}/${today - 4}`,
        `${month}/${today - 3}`,
        `${month}/${today - 2}`,
        `${month}/${today - 1}`,
        `${month}/${today}`,
      ],
      datasets: [
        {
          label: "BMI",
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 5,
          fill: false,
        },
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
});
