const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "wrong min price"],
    max: [100000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,
    // min: [1, "wrong min discountPercentage"],
    // max: [100000, "wrong max discountPercentage"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "wrong min stock"],
    default: 0,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  images: {
    type: [String],
  },
  stocks: {
    type: String,
    default: 5,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  colors: {
    type: [Schema.Types.Mixed],
  },
  sizes: {
    type: [Schema.Types.Mixed],
  },
  highlights: {
    type: [String],
  },
  discountedPrice:{type:Number}
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const productModel = model("Product", productSchema);

module.exports = productModel;
