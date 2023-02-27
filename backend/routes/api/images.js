const express = require('express');
const router = express.Router();

const { EventImage, GroupImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.delete('/group-images/:imageId', [restoreUser, requireAuth], async (req, res) => {
    const image = await GroupImage.findByPk(req.params.imageId)

    await image.destroy()
    res.json({message: "Successfully deleted"})
})

router.delete('/event-images/:imageId', [restoreUser, requireAuth], async(req, res) => {
    const image = await EventImage.findByPk(req.params.imageId)

     await image.destroy()    
     res.json({message: "Successfully deleted"})
})


module.exports = router