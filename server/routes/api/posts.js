const mongoose = require('mongoose');
const router = require('express').Router();
const Posts = mongoose.model('Posts');

router.post('/', (req, res, next) => {
  const { body } = req;

  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if (!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if (!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  const finalPost = new Posts(body);
  return finalPost
    .save()
    .then(() => res.json({ post: finalPost.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Posts.find()
    .sort({ createdAt: 'descending' })
    .then((posts) => res.json({ posts: posts.map((post) => post.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Posts.findById(id, (err, post) => {
    if (err) {
      return res.sendStatus(404);
    } else if (post) {
      req.post = post;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    post: req.post.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if (typeof body.title !== 'undefined') {
    req.post.title = body.title;
  }

  if (typeof body.author !== 'undefined') {
    req.post.author = body.author;
  }

  if (typeof body.body !== 'undefined') {
    req.post.body = body.body;
  }

  return req.post
    .save()
    .then(() => res.json({ post: req.post.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Posts.findByIdAndRemove(req.post._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
