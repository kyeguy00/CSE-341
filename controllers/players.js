const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("players")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("nba_players")
    .collection("players")
    .find({ _id: userId });
  // if (result.toArray().length === 0) {
  //   res.status(404).send("Not Found");
  //   return;
  // }
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  try {
    if (
      !req.body?.firstName ||
      !req.body?.lastName ||
      !req.body?.position ||
      !req.body?.mpg ||
      !req.body?.ppg ||
      !req.body?.apg ||
      !req.body?.rpg
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      mpg: req.body.mpg,
      ppg: req.body.ppg,
      apg: req.body.apg,
      rpg: req.body.rpg,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("players")
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the contact."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateContact = async (req, res) => {
  try {
    if (
      !req.body?.firstName ||
      !req.body?.lastName ||
      !req.body?.position ||
      !req.body?.mpg ||
      !req.body?.ppg ||
      !req.body?.apg ||
      !req.body?.rpg
    ) {
      console.log("Invalid");
      res.status(400).send("Bad request");
      return;
    }
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      mpg: req.body.mpg,
      ppg: req.body.ppg,
      apg: req.body.apg,
      rpg: req.body.rpg,
    };
    const response = await mongodb
      .getDb()
      .db("nba_players")
      .collection("players")
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the contact."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteContact = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Bad request");
    return;
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("nba_players")
    .collection("players")
    .remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
