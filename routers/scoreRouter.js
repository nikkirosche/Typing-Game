const express = require('express');
const router = express.Router();

class ScoreRouter {
    constructor (controller) {
        this.controller = controller;
    }

router(){
    router.get('/', this.controller.scorePage.bind(this.controller));
    router.post('/post', this.controller.scoreBoard.bind(this.controller));
    return router;
}
}

module.exports = ScoreRouter;