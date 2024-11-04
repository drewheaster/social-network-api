const { Thought, User } = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find().then(thoughts => res.json(thoughts)).catch(err => res.status(500).json(err));
  },
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id }).then(thought => res.json(thought)).catch(err => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body).then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    }).then(user => res.json(user)).catch(err => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(thought => res.json(thought)).catch(err => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then(thought => res.json(thought)).catch(err => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    ).then(thought => res.json(thought)).catch(err => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    ).then(thought => res.json(thought)).catch(err => res.status(500).json(err));
  },
};