const express = require('express');
const router = express.Router();

class HomeRouter {
    constructor (controller) {
      this.controller = controller;
    }

router(){
    router.get('/', this.controller.homePage.bind(this.controller));
    router.get('/login', this.controller.loginPage.bind(this.controller));
    router.get('/register', this.controller.registerPage.bind(this.controller));
    router.get('/logout', this.controller.logoutPage.bind(this.controller));
    router.post('/login', this.controller.postLogin.bind(this.controller));
    router.post('/register', this.controller.postRegister.bind(this.controller));
    return router;
  }
}

module.exports = HomeRouter;