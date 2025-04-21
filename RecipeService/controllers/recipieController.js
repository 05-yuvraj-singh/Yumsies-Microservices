const recipie = require("../models/recipieModel");
const User = require("../models/userModel")

const getRecipies = async (req, res) => {
  try {
    const recipies = await recipie.find({});
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(recipies);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await recipie.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ success: true, message: 'Recipe fetched successfully', data: recipe, error: {} });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch recipe', data: {}, error: error.message });
  }
};




const postrecipie = async (req, res) => { 
  try {
    const newRecipe = await recipie.create(req.body); 
    const userData = await User.findById(req.body.author);

    userData.recepies.push(newRecipe.id); 
    await userData.save();
    res.status(200).json(newRecipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


const searchrecipie = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const searchResults = await recipie.find({
      $text: {
        $search: searchTerm,
      },
    });

    res.json(searchResults);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "An error occurred during the search" });
  }
};


const likeRecipie= (req,res)=>{

}
const updateRecipie = (req,res)=>{

}

const deleteRecepie = (req,res)=>{
  
}

module.exports = { getRecipies, getRecipeById , searchrecipie, postrecipie, likeRecipie, updateRecipie, deleteRecepie};