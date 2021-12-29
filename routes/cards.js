const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
    res.render('card', {
        prompt: cards[req.params.id].question, //this points the prompt property to the first card's property.
        hint : cards[req.params.id].hint //this points to the hint of the card's hint.
    });
});

module.exports = router;