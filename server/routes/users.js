const express = require('express');
const router = express.Router();

const {getUser, updateUser, signUp, login} = require("../controllers/user")


router.post('/sign-up', signUp)
router.post('/login', login)
router.get('/:id', getUser)
router.put('/:id', updateUser)
module.exports = router;
