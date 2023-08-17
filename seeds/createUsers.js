const { faker } = require('@faker-js/faker');
const { User } = require("../models");
const bcrypt = require("bcrypt");

const createUsers = async () => {
    const users = [...Array(10)].map((user) => ({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("password", 10),
    }));
    //randomly create the object of users and append it to the array[].
    await User.bulkCreate(users);
    //user is a list/array of objects. bulkCreate is like forloop to create the same format of objects.
    //bulkCreate() is a method provided by many ORM libraries to insert multiple records into a database table in a single operation
};

module.exports = createUsers;