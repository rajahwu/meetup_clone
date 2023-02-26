const express = require('express');
const router = express.Router();

const { EventImage, GroupImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.delete('/event-imagess/:imageId', [restoreUser, requireAuth], async(req, res) => {
    const image = await EventImage.findByPk(req.params.imageId)

    image.destory()    
})

router.delete('/group-images/:imageId', [restoreUser, requireAuth], async (req, res) => {
    const image = await GroupImage.findByPk(req.params.imageId)

    image.destory()
})