const stepsGoal = 10000;

const timeNow = new Date();
const todayMonth = timeNow.getMonth()+1;
const todayDate = timeNow.getDate();
const todayMMDD = `${todayMonth}/${todayDate}`


const ctx = document.getElementById("stepsChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [`${todayMonth}/${todayDate-6}`, `${todayMonth}/${todayDate-5}`, `${todayMonth}/${todayDate-4}`, `${todayMonth}/${todayDate-3}`, `${todayMonth}/${todayDate-2}`, `${todayMonth}/${todayDate-1}`, `${todayMonth}/${todayDate}`],
    datasets: [
      {
        label: "Steps Taken",
        data: [4578, 7983, 5042, 7261, 5425, 10236, 3868],
        borderWidth: 1,
        backgroundColor: "#6f9283"
      }, 
      {
        type: "line",
        label: "Steps Goal",
        data: [stepsGoal, stepsGoal, stepsGoal, stepsGoal, stepsGoal, stepsGoal, stepsGoal],
        backgroundColor: "#222e50",
        pointHitRadius: 15,
        pointHoverRadius: 10,
      }
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

// new donutChart(ctx, {
//     type: "donut",
//     data: {
//       labels: ["12/13", "12/14", "12/15", "12/16", "12/17", "12/18", "12/19"],
//       datasets: [
//         {
//           label: "Steps Taken",
//           data: [4578, 7983, 5042, 7261, 5425, 10236, 3868],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });