var mongoose = require("mongoose");
var venue = mongoose.model("venue");

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const listVenues = async (req, res) => {
  await venue
    .find()
    .exec()
    .then((venues) => {
      try {
        createResponse(res, 200, venues);
      } catch (error) {
        createResponse(res, 404, { status: "Mekanlar bulunamadi." });
      }
    });
};

const addVenue = async (req, res) => {
  const newVenue = {
    coordinates: req.body.coordinates,
    hours: req.body.hours,
    name: req.body.name,
    rating: req.body.rating,
    address: req.body.address,
    foodanddrink: req.body.foodanddrink,
  };

  try {
    await venue.collection.insertOne(newVenue);
    createResponse(res, 200, newVenue);
  } catch (error) {
    createResponse(res, 404, { status: "Mekan Eklenmedi." });
  }
};

const getVenue = async (req, res) => {
  try {
    await venue
      .findById(req.params.venueId)
      .exec()
      .then((v) => {
        createResponse(res, 200, v);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Boyle bir mekan yok.", error });
  }
};

const updateVenue = async (req, res) => {
  const updatedVenue = {
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating,
    foodanddrink: req.body.foodanddrink,
    coordinates: req.body.coordinates,
    hours: req.body.hours,
  };

  try {
    await venue
      .updateOne({ _id: req.params.venueId }, updatedVenue)
      .exec()
      .then((v) => {
        createResponse(res, 200, v);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Boyle bir mekan yok." });
  }
};

const deleteVenue = async (req, res) => {
  try {
    await venue
      .deleteOne({ _id: req.params.venueId })
      .exec()
      .then((v) => {
        createResponse(res, 200, v);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Boyle bir mekan yok." });
  }
};

module.exports = { listVenues, addVenue, getVenue, updateVenue, deleteVenue };
