const mongoose = require("mongoose");

const { Schema } = mongoose;

const EntrySchema = new Schema(
  {
    author: String,
    body: String,
    title: String,
  },
  { timestamps: true }
);

EntrySchema.methods.toJSON = function() {
  return {
    id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model("Entry", EntrySchema);
