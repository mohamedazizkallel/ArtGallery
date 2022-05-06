const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const Painting = require('../models/painting')

// CREATE A PAINTING
router.post('/', upload.single('paintingImg'), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)

    // Create new painting
    let painting = new Painting({
      name: req.body.name,
      artist: req.body.artist,
      year: req.body.year,
      paintingImg: result.secure_url,
      cloudinary_id: result.public_id,
    })
    // Save painting
    await painting.save()
    res.json(painting)
  } catch (err) {
    console.log(err)
  }
})

// GET ALL PAINTINGS
router.get('/', async (req, res) => {
  try {
    let painting = await Painting.find()
    console.log(painting)
    res.json(painting)
  } catch (err) {
    console.log(err)
  }
})

// DELETE PAINTING
router.delete('/:id', async (req, res) => {
  try {
    // Find painting by id
    let painting = await Painting.findById(req.params.id)
    console.log('found painting')
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(painting.cloudinary_id)
    console.log('delete from cloudinary')
    // Delete painting from db
    await painting.remove()
    res.json(painting)
    console.log('deleting from db')
  } catch (err) {
    console.log(err)
  }
})

// UPDATE PAINTING
router.put('/:id', upload.single('paintingImg'), async (req, res) => {
  try {
    let painting = await Painting.findById(req.params.id)
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(painting.cloudinary_id)
    // Upload image to cloudinary
    let result
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path)
    }
    const data = {
      name: req.body.name || painting.name,
      artist: req.body.artist || painting.artist,
      year: req.body.year || painting.year,
      paintingImg: result?.secure_url || painting.paintingImg,
      cloudinary_id: result?.public_id || painting.cloudinary_id,
    }
    painting = await Painting.findByIdAndUpdate(req.params.id, data, {
      new: true,
    })
    res.json(painting)
  } catch (err) {
    console.log(err)
  }
})

// GET ONE PAINTING BY ID
router.get('/:id', async (req, res) => {
  try {
    // Find painting by id
    let painting = await Painting.findById(req.params.id)
    res.json(painting)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
