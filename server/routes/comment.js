const express = require('express');
const router = express.Router();

const {getComment, updateComment, createComment, deleteComment} = require("../controllers/comment")

router.post('/', createComment)
router.get('/:id', getComment)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router;
