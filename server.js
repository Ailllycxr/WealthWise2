const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hours = 24;
const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * hours,
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sessionConfig));

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/")));

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
