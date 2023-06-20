const router = require('express').Router();
const accountsModel = require('./accounts-model');
const mw = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const allAccounts = await accountsModel.getAll();
    res.json(allAccounts);
  } catch (error) {
    next(error);
  };
});

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  try {
    res.json(req.existUserID);
  } catch (error) {
    next(error);
  };
});

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  try {
    const createdPost = {
      name: req.body.name,
      budget: req.body.budget
    }
    const insertedAcc = await accountsModel.create(createdPost);
    res.status(201).json(insertedAcc)
  } catch (error) {
    next(error);
  }
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  try {
    const updatePost = {
      name: req.body.name,
      budget: req.body.budget
    }
    const updatedAcc = await accountsModel.updateById(req.params.id, updatePost);
    res.status(200).json(updatedAcc)
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  try {
    await accountsModel.deleteById(req.params.id);
    res.json({ message: `${req.params.id} is successfully deleted...` })
  } catch (error) {
    next(error);
  }
})

module.exports = router;