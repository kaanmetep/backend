var mongoose = require("mongoose");
var Venue = mongoose.model("venue");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const addComment = function (req, res) {
  createResponse(res, 200, { status: "Basarili" });
};
const getComment = function (req, res) {
  createResponse(res, 200, { status: "Basarili" });
};
const updateComment = function (req, res) {
  createResponse(res, 200, { status: "Basarili" });
};
const deleteComment = function (req, res) {
  createResponse(res, 200, { status: "Basarili" });
};

module.exports = {
  addComment,
  deleteComment,
  getComment,
  updateComment,
};
