const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

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
const getSingleTeam = async (req, res, next) => {
  const teamId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("teams")
    .find({ _id: teamId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createTeam = async (req, res) => {
  try {
    if (
      !req.body?.teamName ||
      !req.body?.cityName || 
      !req.body?.stateName 
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }

    const team = {
      teamName: req.body.teamName,
      cityName: req.body.cityName,
      stateName: req.body.stateName,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("teams")
      .insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the team."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTeam = async (req, res) => {
  try {
    if (
      !req.body?.teamName ||
      !req.body?.cityName || 
      !req.body?.stateName 
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }
    const teamId = new ObjectId(req.params.id);
    const team = {
      teamName: req.body.teamName,
      cityName: req.body.cityName,
      stateName: req.body.stateName,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("teams")
      .replaceOne({ _id: teamId }, team);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the team."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeam = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Bad request");
    return;
  }
  const teamId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("nba_players")
    .collection("teams")
    .remove({ _id: teamId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the team."
      );
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam
};