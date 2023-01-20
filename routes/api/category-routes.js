const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    });

    // Set price value to always 2 decimal places
    allCategories.forEach(category => {
      category.dataValues.products.forEach(item => {
        item.dataValues.price = item.dataValues.price.toFixed(2);
      });
    });

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    // Check for data
    if (!getCategory) {
      res.status(404).json({ 
        message: `Category not found with ID: ${req.params.id}` 
      });
      return;
    }

    // Set price value to always 2 decimal places
    getCategory.dataValues.products.forEach(item => {
      item.dataValues.price = item.dataValues.price.toFixed(2);
    });

    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        id: req.params.id,
        category_name: req.body.category_name
      }, 
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  } 
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
  
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
