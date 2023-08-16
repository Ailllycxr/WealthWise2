const router = require("express").Router();
const { useAuth } = require("../utils/auth");
const {Budget, User,Income, Expense}  = require("../models");


router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/logout", useAuth, (req, res) => {
  try {
    req.session.destroy(() => {
      res.render("logoutconfirm");
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/items", useAuth, async (req, res) => {
  try {
    res.render("items", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/budget", useAuth, async (req, res) => {
  try {
    const totalBudget = await Budget.findAll({
      attributes:[
        "id",
        'budget_name',
        "total_expense",
        "total_income",
        "total_savings"
      ],
      where:{
        user_budget_id: req.session.user_id,
      }
      
    })
    const  totalBudgetData = totalBudget.map(budget => budget.get({plain : true}));
    
    renderTotalExpense = totalUserExpense(totalBudgetData)
    renderTotalRevenue = totalUserRevenue(totalBudgetData)
    renderTotalSavings = totalUserSaving(totalBudgetData)

    console.log(totalBudgetData);
    console.log(renderTotalExpense);
 
    
    res.render("budgetAnalysis", {
      logged_in: req.session.logged_in,
      renderTotalExpense,
      renderTotalRevenue,
      renderTotalSavings

    }); 
  } catch (err) {
    res.status(500).json(err);
  }
});

function totalUserExpense(totalBudgetData){
  let totalExpense=0
  for (var i=0; i< totalBudgetData.length; i++){
    if(totalBudgetData[i].total_expense===null){
      totalExpense += 0
    } else {
      totalExpense += totalBudgetData[i].total_expense
    }
  }
  return totalExpense
}




function totalUserRevenue(totalBudgetData){
     let totalRevenue=0;
  for (var i=0; i< totalBudgetData.length; i++){
  if(totalBudgetData[i].total_income===null){
    totalRevenue += 0
  } else {
    totalRevenue += totalBudgetData[i].total_income
  }
  return totalRevenue
}}



function totalUserSaving(totalBudgetData){
  let totalSavings=0;
  for (var i=0; i< totalBudgetData.length; i++){
  if(totalBudgetData[i].total_savings===null){
    totalSavings += 0
  } else {
    totalSavings += totalBudgetData[i].total_savings
  }
  return totalSavings
}}

module.exports = router;
