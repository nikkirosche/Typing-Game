const express = require('express');
const router = express.Router();

class WordsRouter {
    constructor (controller) {
        this.controller = controller;
    }

router(){
    router.get('/', this.controller.gamePage.bind(this.controller));
    router.get('/words', this.controller.getWords.bind(this.controller));
    return router;
}
}

module.exports = WordsRouter;