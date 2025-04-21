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


const searchRecipe = async (req, res) => {
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

const likeRecipie = async (req, res) => {
  try {
    const userId = req.query.user; // Assuming the user ID is passed as a query parameter
    const recipeId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required to like a recipe' });
    }

    const recipe = await recipie.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the user has already liked the recipe
    if (recipe.likes.includes(userId)) {
      // Unlike the recipe
      recipe.likes = recipe.likes.filter((id) => id !== userId);
      await recipe.save();
      return res.status(200).json({ message: 'Recipe unliked', likes: recipe.likes });
    } else {
      // Like the recipe
      recipe.likes.push(userId);
      await recipe.save();
      return res.status(200).json({ message: 'Recipe liked', likes: recipe.likes });
    }

  } catch (error) {
    console.error('Error liking/unliking recipe:', error);
    res.status(500).json({ message: 'Failed to like/unlike recipe', error: error.message });
  }
};

const updateRecipie = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updateData = req.body;

    const updatedRecipe = await recipie.findByIdAndUpdate(
      recipeId,
      updateData,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });

  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Failed to update recipe', error: error.message });
  }
};

const deleteRecepie = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const deletedRecipe = await recipie.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully' });

  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe', error: error.message });
  }
};



module.exports = { getRecipies, getRecipeById , searchRecipe, postrecipie, likeRecipie, updateRecipie, deleteRecepie};