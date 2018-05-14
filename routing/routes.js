var express = require('express');
var router = express.Router(); 
var path = require('path'); 

router.get('/search', (req, res) => {
    console.log('getting search page');
    res.sendFile(path.resolve('public/search.html'));
});

module.exports = router;


