const mongoose = require("mongoose");
const { paginate } = require("./plugins/paginate");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
},
{timestamps:true});

categorySchema.plugin(paginate);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
