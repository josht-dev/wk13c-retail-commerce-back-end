const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]

    });

    // Set price value to always 2 decimal places
    allTags.forEach(tag => {
      tag.dataValues.products.forEach(item => {
        item.dataValues.price = item.dataValues.price.toFixed(2);
      });
    });
   

    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    // Check for data
    if (!getTag) {
      res.status(404).json({ 
        message: `Tag not found with ID: ${req.params.id}` 
      });
      return;
    }

    // Set price value to always 2 decimal places
    getTag.dataValues.products.forEach(item => {
      item.dataValues.price = item.dataValues.price.toFixed(2);
    });


    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
