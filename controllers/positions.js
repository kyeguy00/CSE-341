const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

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

const getSinglePosition = async (req, res, next) => {
  const positionId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("positions")
    .find({ _id: positionId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createPosition = async (req, res) => {
  try {
    if (
      !req.body?.positionName 
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }

    const position = {
      positionName: req.body.positionName,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("positions")
      .insertOne(position);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the position."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePosition = async (req, res) => {
  try {
    if (
      !req.body?.positionName
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }
    const positionId = new ObjectId(req.params.id);
    const position = {
      positionName: req.body.positionName,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("positions")
      .replaceOne({ _id: positionId }, position);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the position."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePosition = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Bad request");
    return;
  }
  const positionId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("nba_players")
    .collection("positions")
    .remove({ _id: positionId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the position."
      );
  }
};

module.exports = {
  getAllPositions,
  getSinglePosition,
  createPosition,
  updatePosition,
  deletePosition
};