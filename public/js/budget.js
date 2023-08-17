const incomeChart = document.querySelector("#income-chart");
const expenseChart = document.querySelector("#expense-chart");
const incomeBar = document.querySelector("#budget-trend");

const colors = [
  "#b18dff",
  "#f8acff",
  "#5c7aff",
  "#f5f4e5",
  "#101010"
];

const renderIncomepie= async(data)=> {
  const labels = Object.keys(data.totals);
  const values = Object.values(data.totals);
  const chartData = {
  labels:labels, //req.body.monthlyexpense
  new Chart (chart1, {
      type: "line",
      data: {
          labels: xValues,
          datasets: [
          {
              backgroundColor: barColors,
              data: yValues,
          },
          ],
      },
      const incomeChartVar = new Chart(incomeChart, {
        type: "pie",
        data: chartData,
      }});
  })};

// const renderExpenseChart = async (data) => {
//   const labels = Object.keys(data.totals);
//   const values = Object.values(data.totals);
//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         data: values,
//         backgroundColor: colors,
//         hoverBackgroundColor: colors,
//       },
//     ],
//   };
//   const expenseChartVar = new Chart( expenseChart, {
//     type: "pie",
//     data: chartData,
//   });
// };



// const renderIncomeBar = async (data) => {
//   const labels = Object.keys(data.totals);
//   const values = Object.values(data.totals);
  
//   const chartData = {
//     labels: labels,
//     datasets: [{
//       label: 'Income by Category',
//       data: values,
//       backgroundColor: colors,
//       borderColor: colors,
//       borderWidth: 1,
//      }
//     ],
//   };
//   const expenseChartVar = new Chart(incomeBar, {
//     type: "bar",
//     data: chartData,
//   });
}