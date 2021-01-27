const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.render("WELCOME"));

module.exports = router;