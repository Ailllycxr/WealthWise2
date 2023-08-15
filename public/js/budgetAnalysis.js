const incomeChart = document.querySelector("#income-chart");
const expenseChart = document.querySelector("#expense-chart");
const incomeBar = document.querySelector("#budget-trend");

//there will only be five top category in the color, the rest will be group into others
const colors = [
  "#b18dff",
  "#f8acff",
  "#5c7aff",
  "#f5f4e5",
  "#101010"
];


//May not need the below code  
const getIncomeItems = async (user_id, budget_id) => {
  try {
    const response = await fetch(`/api/revenue/${user_id}/${budget_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  
  } catch (error) {
    console.log(error);
  }
};
//May not need the below code  
const getExpenseItems = async (user_id, budget_id) => {
  try {
    const response = await fetch(`/api/expense/${user_id}/${budget_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
//May coule be the one that have total expense 
const getCurrentBudget = async (user_id, budget_id) => {
  try {
    const response = await fetch(`/api/budget/${user_id}/${budget_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const budgetData = response.get({ plain: true });
    res.render('budgetAnalysis', budgetData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const requestHandler = async (user_id, budget_id) => {
  let dataOne, dataTwo, dataThree;

  try {
    const [responseOne, responseTwo, responseThree] = await Promise.all([
      getIncomeItems(user_id, budget_id),
      getExpenseItems(user_id, budget_id),
      getCurrentBudget(user_id, budget_id),
    ]);

    dataOne = await responseOne.json();
    dataTwo = await responseTwo.json();
    dataThree = await responseThree.json();
  } catch (error) {
    console.log(error);
  }
  const data = { dataOne, dataTwo, dataThree };
  return data;
};

const getSession = async () => {
  try {
    const response = await fetch("/api/session/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const calculateCategoryTotals = async (data) => {
  const categoryTotals = {};
  let totalAmount = 0;

  for (const item of data) {
    const { category, amount } = item;
    totalAmount += amount;
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  }

  const categoryPercentages = {};
  for (const category in categoryTotals) {
    const percentage = (categoryTotals[category] / totalAmount) * 100;
    categoryPercentages[category] = percentage.toFixed(2);
  }

  return {
    totals: categoryTotals,
    percentages: categoryPercentages,
  };
};

const renderIncomeChart = async (data) => {
  const labels = Object.keys(data.totals);
  const values = Object.values(data.totals);
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  const incomeChartVar = new Chart(incomeChart, {
    type: "pie",
    data: chartData,
  });
};

const renderExpenseChart = async (data) => {
  const labels = Object.keys(data.totals);
  const values = Object.values(data.totals);
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  const expenseChartVar = new Chart( expenseChart, {
    type: "pie",
    data: chartData,
  });
};


const renderIncomeBar = async (data) => {
  const labels = Object.keys(data.totals);
  const values = Object.values(data.totals);
  
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Income by Category',
      data: values,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
    }
  ],
  };
  const expenseChartVar = new Chart( incomeBar, {
    type: "bar",
    data: chartData,
  });
}

const renderExpenseBar = async (data) => {
  const labels = Object.keys(data.totals);
  const values = Object.values(data.totals);
  
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Income by Category',
      data: values,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
    }
  ],
  };
  const expenseChartVar = new Chart( expenseBar, {
    type: "bar",
    data: chartData,
  });
}





const init = async () => {
  const session = await getSession();
  const budgetData = await requestHandler(session.user_id, session.budget_id);
  const incomeCategoryData = await calculateCategoryTotals(budgetData.dataOne);
  const expenseCategoryData = await calculateCategoryTotals(budgetData.dataTwo);
  const budget = budgetData.dataThree;
  await renderIncomeChart(incomeCategoryData);
  await renderExpenseChart(expenseCategoryData);
  await renderIncomeBar(incomeCategoryData); 
  await renderExpenseBar(expenseCategoryData);
  await renderTable();
};

document.addEventListener("DOMContentLoaded", async function () {
  init();
});
