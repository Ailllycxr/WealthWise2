const { faker } = require("@faker-js/faker");
const { User, Expense } = require("../models");

const createUsersExpenses = async () => {
  const users = await User.findAll();
  //to make sure the expense is matching with the randomly created users, we need to create expense based on the users
    for (const user of users) {
      let months = ['2023-01', '2023-02','2023-3','2023-4','2023-5','2023-6','2023-7','2023-8','2023-9','2023-10'];
      const expenses = months.map((month) => ({
        expense_name: faker.commerce.productName(),
        user_expense_id: user.dataValues.id,// data shows that they have data value within each user
        amount: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        date: month
      }));
      await Expense.bulkCreate(expenses)
    }
};

module.exports = createUsersExpenses;

