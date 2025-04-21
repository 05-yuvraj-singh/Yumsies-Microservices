const mongoose=require('mongoose');

const recipieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ingredients: {
      type: [String],
      required: true
    },
    instructions: {
      type: [String],
      required: true
    },
    imageUrl: {
    type: [String],
      required: true
    },
    author:{
      type: mongoose.Types.ObjectId,
      ref:"user",
      required: true
    },
    likes:{
      type: [mongoose.Types.ObjectId],
    },
    comments:{
      type: [mongoose.Types.ObjectId]
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  recipieSchema.index({
    title: 'text',
    description: 'text'
  });

const recipie = mongoose.model("recepie" , recipieSchema);
module.exports = recipie;

