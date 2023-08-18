# WealthWise

# Generating Shape

## Key Technology Used

| Technology Used  |                                           Resource URL                                            |
| ---------------- | :-----------------------------------------------------------------------------------------------: |
| Git              |                           [https://git-scm.com/](https://git-scm.com/)                            |
| Tabulator Tables | [https://www.npmjs.com/package/tabulator-tables/](https://www.npmjs.com/package/tabulator-tables) |
| Sequelize        |           [https://www.npmjs.com/package/mysql2/](https://www.npmjs.com/package/mysql2)           |
| MySQL2           |                           [https://git-scm.com/](https://git-scm.com/)                            |
| Faker            | [https://www.npmjs.com/package/@faker-js/faker/](https://www.npmjs.com/package/@faker-js/faker/)  |

## Description

WealthWise is a latest application to train your brain muscle for wealth management. It empowers individuals with a comprehensive view of their current financial status and potential future outlook. WealthWise aims to instill proactive, organized financial preparedness.

## Code Refactor Example

```Javascript (Handlebar Data)

<div class="d-flex flex-row col-12">
  {{!-- card1 --}}
      <div class="d-flex flex-column col-8">
    {{!-- chart1 --}}
        <div class="card border-0 mt-5 ms-5">
          <div class="card-body d-flex justify-content-center">
            <canvas
              id="incomePie"
              style="width: 60%;"
            ></canvas>
          </div>
        </div>
```

```Javascript (Wranggling Data)
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
```

```Javascript (seeding data)
cconst createUsersIncomes = async () => {
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
```

## Installation

Please make sure to install all packages before running the code if needed.

## Usage

The application is deployed on Heroku. Please follow the steps below

(1) if you first-time user, please click to sign up. Fill in the information to create an account
(2) if you are not first-time users, please click to login.

After that, please click "Ready Go!" to start the journey.

Reflect the key cash inflow and outflow in mind, and then click the long button to the next page.

To create a transaction, fill in the infomation for the chart and click to add items.

Click the blue button to get to a analysis snapshot.

## Learning Points

1. HashMap for data manupulation
2. Use faker for data seeding

## Author Info

### To be Determined. Created by people love programming

## Credits

- W3school| [https://www.w3schools.com](https://www.w3schools.com)

## License

Copyright (c). All rights reserved.
Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

## Features

The nevigation bar items link to their content repectively
