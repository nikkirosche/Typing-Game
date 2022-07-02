const { user } = require("pg/lib/defaults");

class ScoreController {
  constructor(model, usersModel) {
    this.model = model;
    this.usersModel = usersModel;
  }

  async scorePage(req, res) {
    console.log("Accessing score page");
    try {
      //no ejs object <insert here>
      const playerUsername = await this.usersModel.findOne({
        where: { id: req.cookies.user_id },
      });
      console.log(playerUsername);
      const playerScore = await this.model.findAll({
        where: { userId: req.cookies.user_id },
      });
      console.log(playerScore);
      const scoreObj = { playerUsername, playerScore };
      res.render("score", scoreObj);
    } catch (err) {
      console.log(err);
    }
  }

  //to log the score from game(words) page into score table after game has finished
  async scoreBoard(req, res) {
    console.log("scoreboard is running");
    console.log(req.body);
    console.log(req.cookies);
    try {
      const gameScore = await this.model.create({
        score: req.body.score,
        userId: req.cookies.user_id,
      });
      res.send(gameScore);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ScoreController;
