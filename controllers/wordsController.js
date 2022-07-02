// const { words } = require('../models');
//do I need the above??

// const db = require("../models");

class WordsController {
    constructor(model, db){
        this.model = model; //for the words database
    }

async gamePage(req, res) {
    console.log("Accessing game page");
    try {
        res.render("words");
    } catch (err) {
        console.log(err);
    }
}

async getWords(req, res){
    const wordList = await this.model.findAll();
    res.send(wordList)
}
}

module.exports = WordsController;