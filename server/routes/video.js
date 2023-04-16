const express = require('express');
const router = express.Router();

const {getVideo, updateVideo, createVideo, deleteVideo} = require("../controllers/video")

router.post('/', createVideo)
router.get('/:id', getVideo)
router.put('/:id', updateVideo)
router.delete('/:id', deleteVideo)

module.exports = router;
