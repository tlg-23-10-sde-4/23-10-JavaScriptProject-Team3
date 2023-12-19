//Ari: daily calories burned graph

//apple graph
const data = {
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

// get canvas element in
const ctx = document.getElementById("mychart").getContext("2d");

//create new doughnut chart
const myChart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: {
    resposive: true,
    maintainAspectRatio: false,
  },
});

// create new pie chart graph pull from doughnut graph
// const myChart = new Chart(ctx, {
//   type: "pie",
//   data: data,
//   options: {
//     resposive: true,
//     maintainAspectRatio: false,
//   },
// });
