const incomePie = document.querySelector("#incomePie");
const expensePie = document.querySelector("#expensePie");

// const totalRevenue= document.querySelector("#totalRevenue");


// const chartRevenueData1 =  getIncomeItems(user_id)
// const chartExpenseeData1 =  getExpenseItems(user_id)
// 
// totalRevenue=chartExpenseeData1.total


const colors =[
"#9FE2BF",
"#53BDAS",
"#F5C26B",
"#CBD6E2",
"#4FB06D",
"#CAE7D3",
"#5C62D6",
"#EBB8DD",
]
//
//

const retriveID = async () => {
  try {
    const response = await fetch(`/api/session/current`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();

  } catch (error) {
    console.log(error);
  }
};

const getIncomeItems = async (user_id) => {
  try {
    const response = await fetch(`/api/revenue/${user_id}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};


const getExpenseItems = async (user_id) => {
  try {
    const response = await fetch(`/api/expense/${user_id}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }); 
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};


//render income chart // you need the data in here
const renderIncomePie= async(user_id)=> {
  const chartRevenueData = await getIncomeItems(user_id)

  const totalRevenue = document.querySelector(".totalRevenue");
  console.log(chartRevenueData.total)
  totalRevenue.textContent=chartRevenueData.total

  const labels = chartRevenueData.revenueCategoryArray
  const values = chartRevenueData.incomeArrayPer;
  new Chart (incomePie, {
      type: "pie",
      data: {
          labels: labels,
          datasets: [
          {
              backgroundColor: colors,
              data: values,
          },
          ],
      },
  })};

const renderExpensePie= async(user_id)=> {
    const chartDataExpense = await getExpenseItems(user_id)
    const totalExpense = document.querySelector(".totalExpense");
    totalExpense.textContent=chartDataExpense.total
    const labels =chartDataExpense.expenseCategoryArray
    const values = chartDataExpense.expenseArrayPer;
    new Chart(expensePie, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
            {
                backgroundColor: colors,
                data: values,
            },
            ],
        },
    })};

const init = async () => {
  const {user_id} = await retriveID()
  await renderIncomePie(user_id); 
  await renderExpensePie(user_id);
};

document.addEventListener("DOMContentLoaded", async function () {
  init();
});
