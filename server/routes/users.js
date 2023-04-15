const express = require('express');
const router = express.Router();

const {getUser, updateUser, createUser} = require("../controllers/user")

router.post('/', createUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)

module.exports = router;
