var express = require('express');
var router = express.Router();

router.get("/", async (req, res, next) => {
    res.status(200).json({health: true});
});

module.exports = router;