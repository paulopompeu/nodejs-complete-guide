const path = require("path");
const { username, password } = require("./credentials/mongodb-atlas.json");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5d642eb4bab861f23b48c4cf")
    .then(user => { 
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0-euas3.mongodb.net/shop?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Pompeu',
          email: 'pompeu@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
