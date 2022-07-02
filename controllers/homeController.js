const jsSHA = require("jsSHA");
const { users } = require("../models");

class HomeController {
  constructor(model) {
    this.model = model; //for the users database
  }

  homePage(req, res) {
    console.log("GET Request: home");
    try {
      res.render("home");
    } catch (err) {
      console.log(err);
    }
  }

  loginPage(req, res) {
    console.log("GET Request: /login");
    try {
      res.render("login");
    } catch (err) {
      console.log(err);
    }
  }

  registerPage(req, res) {
    console.log("GET Request: /register");
    try {
      res.render("register");
    } catch (err) {
      console.log(err);
    }
  }

  async postRegister(req, res) {
    const shaObj = new jsSHA("SHA-512", "TEXT", {
      encoding: "UTF8",
    });
    console.log(req.body);
    shaObj.update(req.body.password);
    const hashedPassword = shaObj.getHash("HEX");
    try {
      //create new user
      console.log(req.body);
      const allUsers = await this.model.create({
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
      });
      res.send({ success: true });
    } catch (err) {
      console.log(err);
    }
  }

  async postLogin(req, res) {
    const data = req.body.email;
    console.log("POSTLOGIN route");
    console.log(data);
    try {
      //check if user exist
      const authUser = await this.model.findOne({ where: { email: data } });
      console.log(authUser);
      console.log("user exist!");
      //if user does not exist
      if (req.body.email !== authUser.email) {
        console.log("user email does not exist!");
        return;
      }
      //get user password tallied
      const shaObj = new jsSHA("SHA-512", "TEXT", {
        encoding: "UTF8",
      });
      //input password from the request to the SHA object
      shaObj.update(req.body.password);
      //get hashedPassword
      const hashedPassword = shaObj.getHash("HEX");

      // to tally the password in database with above hashed one
      console.log(hashedPassword);
      if (authUser.password !== hashedPassword) {
        console.log("password does not match!");
        return;
      }
      // for cookie
      res.cookie("loggedIn", true);
      //save user id in cookie; check this with tutor; users.id > backend table
      res.cookie("user_id", authUser.id);
      console.log(authUser.id);
      res.send({ success: true });
    } catch (err) {
      console.log(err);
    }
  }

  async logoutPage(req, res) {
    console.log("I am the logout cookie clearer")
    try {
      //to clear the cookie
      res.clearCookie("user_id");
      res.clearCookie("loggedIn")
      res.redirect("/home")
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = HomeController;
