const mongodb = require("../db/connect");
//const ObjectId = require("mongodb").ObjectId;

const getAllArenas = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("arenas")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

module.exports = {
  getAllArenas
};