const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

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

const getSingleArena = async (req, res, next) => {
  const arenaId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("arenas")
    .find({ _id: arenaId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createArena = async (req, res) => {
  try {
    if (
      !req.body?.arenaName ||
      !req.body?.arenaCity ||
      !req.body?.arenaTeam 
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }

    const arena = {
      arenaName: req.body.arenaName,
      arenaCity: req.body.arenaCity,
      arenaTeam: req.body.arenaTeam,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("arenas")
      .insertOne(arena);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the arena."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateArena = async (req, res) => {
  try {
    if (
      !req.body?.arenaName ||
      !req.body?.arenaCity ||
      !req.body?.arenaTeam 
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }
    const arenaId = new ObjectId(req.params.id);
    const arena = {
      arenaName: req.body.arenaName,
      arenaCity: req.body.arenaCity,
      arenaTeam: req.body.arenaTeam,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("arenas")
      .replaceOne({ _id: arenaId }, arena);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the arena."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteArena = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Bad request");
    return;
  }
  const arenaId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("nba_players")
    .collection("arenas")
    .remove({ _id: arenaId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the arena."
      );
  }
};

module.exports = {
  getAllArenas,
  getSingleArena,
  createArena,
  updateArena,
  deleteArena
};