const router = require("express").Router();
const { User, Expense } = require("../../models");
const { useAuth } = require("../../utils/auth");

router.get("/", useAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const expenseData = await Expense.findAll({
      attributes: [
        "id",
        "expense_name",
        "user_expense_id",
        "amount",
        "description",
        "category",
        "date",
      ],
      where: {
        user_expense_id: userId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    res.json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:user", useAuth, async (req, res) => {

  try {
    const findExpense = await Expense.findAll({
      where: {
        user_expense_id: req.params.user,
      },
    });

  if (!findExpense) {
      res.status(404).json({ message: 'No expense found with this user id'});
      return;
  }
  const expenseUserData = findExpense.map(expense => expense.get({plain : true}));
  
  const mapExpense =new Map ()
  for (const eachExpense of expenseUserData) {
      if (mapExpense.has(eachExpense.category)) {
        mapExpense.set(eachExpense.category,mapExpense.get(eachExpense.category)+eachExpense.amount)
      } else {
        mapExpense.set (eachExpense.category,eachExpense.amount)

      }
  }
  
          const expenseCategoryArray  = []
          const categories= mapExpense.keys()
          for (const category of categories){
            expenseCategoryArray.push(category)
          }
          
          const expenseArray  = []
          const expense= mapExpense.values()
          for (const amount of expense){
              expenseArray.push(amount)
          }
       
         
          const total = expenseArray.reduce((a,c)=> a+c)
          const expenseArrayPer = expenseArray.map ((amount) =>(amount/total))
          
          console.log(expenseArrayPer)

          let responseExpenseData = {
            expenseUserData:expenseUserData,
            expenseCategoryArray:expenseCategoryArray ,
            expenseArrayPer:expenseArrayPer,
            total:total
        }
        console.log(responseExpenseData)
        
    res.json(responseExpenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", useAuth, async (req, res) => {
  try {
    const createExpense = await Expense.create({
      expense_name: req.body.expense_name,
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      user_expense_id: req.session.user_id,
    });
    res.json(createExpense);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", useAuth, async (req, res) => {
  try {
    const updateExpense = await Expense.update(
      {
        expense_name: req.body.expense_name,
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updateExpense[0] === 0) {
      res
        .status(400)
        .json({
          message: "Please provide a name, category, and amount to the expense",
        });
    }

    res.json(updateExpense);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", useAuth, async (req, res) => {
  try {
    const deleteExpense = await Expense.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteExpense) {
      res.status(400).json({ message: "No expense with that id" });
    }
    res.status(200).json(deleteExpense);
  } catch (err) {
    res.status(500).json("Error in finding expense");
  }
});

module.exports = router;
