const express = require('express');
const router = express.Router();

const users = require("./users")
const video = require("./video")
const comment = require("./comment")

router.use('/users', users);
router.use('/video', video);
router.use('/comment', comment);

module.exports = router;

