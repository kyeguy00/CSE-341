const mongodb = require("../db/connect");
//const ObjectId = require("mongodb").ObjectId;

const getAllPositions = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("positions")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

module.exports = {
  getAllPositions
};