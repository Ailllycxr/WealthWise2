const createUsers = require("./createUsers");
const createUsersIncomes = require("./createUsersIncomes");
const createUsersExpenses = require("./createUsersExpenses");
const sequelize = require("../config/connection");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true })// the data will update/load every time
    //seeding data with the functions
    await createUsers()
    await createUsersIncomes()
    await createUsersExpenses()
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

seedAll();