const router = require("express").Router();
const { useAuth } = require("../utils/auth");
const { User,Income, Expense}  = require("../models");


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

router.get("/reflection", useAuth, async (req, res) => {
  try {
    res.render("reflection", {
      logged_in: req.session.logged_in,
    });
    console.log(res);
  } catch (error) {
    res.status(500).json(error);
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


router.get("/balanceAnalysis", useAuth, async (req, res) => {
  try {
    res.render("balanceAnalysis", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get("/balanceAnalysis",async (req, res) => {
//   try {
//   const dailyExpense = await Expense.findAll({
//       attributes:[
//         "id",
//         'date',
        // [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
      // ],
      // group: ['date'],
      // where:{
      //   user_expense_id: req.session.user_id,
      // },
  //   })

  // const dailyIncome = await Income.findAll({
  //       attributes:[
  //         "id",
  //         'date',
          // [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
        // ],
        // group: ['date'],
        // where:{
        //   user_income_id: req.session.user_id,
        // },
    // }) 
    // const dailyExpenseData = dailyExpense.map(income => income.get({plain : true}));
    // const dailyIncomeData = dailyIncome.map(income => income.get({plain : true}));
    // console.log(dailyExpenseData);
    // console.log(dailyIncomeData)
    // res.render("balanceAnalysis", {
    //   logged_in: req.session.logged_in,
      // renderTotalExpense,
      // renderTotalRevenue,
      // incomePieCategory
      // incomePieAmount
      // expensePieCategory
      // expensePieAmount
      // lineDate
      // lineAmount
//     }); 
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });


module.exports = router;
