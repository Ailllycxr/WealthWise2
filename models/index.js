const Income = require('./Income');
const Expense = require('./Expense');
const User = require('./User');



User.hasMany(Income, {
    foreignKey: 'user_income_id',
});

Income.belongsTo(User, {
    foreignKey: 'user_income_id',
});

User.hasMany(Expense, {
    foreignKey: 'user_expense_id',
});

Expense.belongsTo(User, {
    foreignKey: 'user_expense_id',
});

module.exports = {
    Income,
    Expense,
    User
};
