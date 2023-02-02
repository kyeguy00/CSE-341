const mongodb = require("../db/connect");
//const ObjectId = require("mongodb").ObjectId;

const getAllTeams = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("teams")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

module.exports = {
  getAllTeams
};