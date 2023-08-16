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
    const  totalBudgetData= totalBudget.map(budget => budget.get({plain : true}))
    let totalExpense;
    function totalUserExpense(totalBudgetData){
      for (var i=0; i< totalBudgetData.length; i++){
       totalExpense += totalBudgetData[i].total_expense
      }
    }
    console.log(totalBudgetData)
    

    res.render("budgetAnalysis", {
      logged_in: req.session.logged_in,
      totalBudgetData:totalBudgetData


    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
