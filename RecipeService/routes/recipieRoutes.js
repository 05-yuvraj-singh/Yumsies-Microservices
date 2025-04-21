const express = require('express');
const router = express.Router();
const {getRecipies,getRecipeById,postrecipie } = require("../controllers/recipieController");

// searchrecipie, postrecipie, likeRecipie, updateRecipie, deleteRecepie


router.post('/add-recepie' , postrecipie);

router.get('/get-recipies' , getRecipies);
router.get('/get-recipie/:id' , getRecipeById);

// router.get('/search-recepie' , searchrecipie);

// router.put('/like-recipie/:id',likeRecipie);
// router.put('/update-recepie/:id',updateRecipie);

// router.delete('/delete-recepie/:id',deleteRecepie);

module.exports = router;