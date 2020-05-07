const mongoose = require("mongoose");
const router = require("express").Router();
const Entry = mongoose.model("Entry");

const postRoute = router.post("/", (req, res, next) => {
  const { body } = req;

  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: "is required",
      },
    });
  }

  if (!body.author) {
    return res.status(422).json({
      errors: {
        author: "is required",
      },
    });
  }

  if (!body.body) {
    return res.status(422).json({
      errors: {
        body: "is required",
      },
    });
  }

  const finalEntry = new Entry(body);
  return finalEntry
    .save()
    .then(() => res.json(finalEntry.toJSON()))
    .catch(next);
});

const getRoute = router.get("/", (req, res, next) => {
  return Entry.find()
    .sort({ createdAt: "descending" })
    .then((entries) => {
      const allEntries = entries.map((entry) => entry.toJSON());
      return res.json(allEntries);
    })
    .catch(next);
});

const getByIdParamRoute = router.param("id", (req, res, next, id) => {
  return Entry.findById(id, (err, entry) => {
    if (err) {
      return res.sendStatus(404);
    } else if (entry) {
      req.entry = entry;
      return next();
    }
  }).catch(next);
});

const getByIdRoute = router.get("/:id", (req, res, next) => {
  return res.json({
    entry: req.entry.toJSON(),
  });
});

const updateByIdRoute = router.patch("/:id", (req, res, next) => {
  const { body } = req;

  if (typeof body.title !== "undefined") {
    req.entry.title = body.title;
  }

  if (typeof body.author !== "undefined") {
    req.entry.author = body.author;
  }

  if (typeof body.body !== "undefined") {
    req.entry.body = body.body;
  }

  return req.entry
    .save()
    .then(() => res.json(req.entry.toJSON()))
    .catch(next);
});

const deleteByIdRoute = router.delete("/:id", (req, res, next) => {
  return Entry.findByIdAndRemove(req.entry._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

// module.exports = router;
module.exports.getRoute = getRoute;
module.exports.postRoute = postRoute;
module.exports.getByIdParamRoute = getByIdParamRoute;
module.exports.getByIdRoute = getByIdRoute;
module.exports.updateByIdRoute = updateByIdRoute;
module.exports.deleteByIdRoute = deleteByIdRoute;
