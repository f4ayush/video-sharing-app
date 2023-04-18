const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth')
const {getVideo, getAllVideos, updateVideo, createVideo, deleteVideo, likeVideo, unlikeVideo} = require("../controllers/video")

router.post('/', checkAuth, createVideo)
router.get('/', getAllVideos)
router.get('/:id', getVideo)
router.post('/:id/like',checkAuth, likeVideo)
router.post('/:id/unlike',checkAuth, unlikeVideo)
router.put('/:id',checkAuth, updateVideo)
router.delete('/:id',checkAuth, deleteVideo)

module.exports = router;
