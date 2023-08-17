const { faker } = require('@faker-js/faker');
const { User, Income } = require("../models");

const createUsersIncomes = async () => {
    const users = await User.findAll();
 
    for (const user of users) {
      let months = ['2023-01', '2023-02','2023-3','2023-4','2023-5','2023-6','2023-7','2023-8','2023-9','2023-10'];
      const income = months.map((month) => ({
        //only get ten data point. Map means for each element of the array, lets do the below
        income_name: faker.commerce.productName(),
        user_income_id: user.id,
        amount: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        date: month
      }));
      await Income.bulkCreate(income);
    };
}
  
module.exports = createUsersIncomes;