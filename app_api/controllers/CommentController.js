var mongoose = require("mongoose");
var venue = mongoose.model("venue");

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const addComment = async (req, res) => {
  const newComment = {
    author: req.body.author,
    text: req.body.text,
    rating: req.body.rating,
    date: req.body.date,
  };

  try {
    await venue.collection.insertOne(newComment);
    createResponse(res, 200, newComment);
  } catch (error) {
    createResponse(res, 404, { status: "Yorum Eklenemedi." });
  }
};

const getComment = async (req, res) => {
  try {
    await venue
      .findById(req.params.venueId)
      .select("name comments")
      .exec()
      .then((venue) => {
        var response, comment;

        if (!venue) {
          createResponse(res, 404, { status: "VenueId bulunamadi." });
        } else if (venue.comments && venue.comments.length > 0) {
          comment = venue.comments.id(req.params.commentId);

          if (!comment) {
            createResponse(res, 404, { status: "commentId bulunamadi." });
          } else {
            response = {
              venue: {
                name: venue.name,
                id: req.params.venueId,
              },
              comment: comment,
            };
            createResponse(res, 202, response);
          }
        } else {
          createResponse(res, 404, { status: "Yorum yok." });
        }
      });
  } catch (error) {
    createResponse(res, 404, { status: "Mekan bulunamadi." });
  }
};

const updateComment = async (req, res) => {
  const updatedComment = {
    author: req.body.author,
    text: req.body.text,
    rating: req.body.rating,
    date: req.body.date,
  };

  try {
    await venue
      .updateOne({ _id: req.params.venueId }, updatedComment)
      .exec()
      .then((v) => {
        createResponse(res, 200, v);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Boyle bir yorum yok" });
  }
};

const deleteComment = async (req, res) => {
  try {
    await venue
      .deleteOne({ _id: req.params.CommentId })
      .exec()
      .then((v) => {
        createResponse(res, 200, v);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Boyle bir yorum yok" });
  }
};

module.exports = { addComment, getComment, updateComment, deleteComment };
